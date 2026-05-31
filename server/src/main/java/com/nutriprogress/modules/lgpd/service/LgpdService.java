package com.nutriprogress.modules.lgpd.service;

import com.nutriprogress.modules.billing.repository.PaymentRepository;
import com.nutriprogress.modules.billing.repository.SubscriptionRepository;
import com.nutriprogress.modules.lgpd.dto.DataExportDTO;
import com.nutriprogress.modules.nutritionist.entity.Nutritionist;
import com.nutriprogress.modules.nutritionist.exception.NutritionistNotFoundException;
import com.nutriprogress.modules.nutritionist.repository.NutritionistRepository;
import com.nutriprogress.modules.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class LgpdService {

    private final NutritionistRepository nutritionistRepository;
    private final PatientRepository patientRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final PaymentRepository paymentRepository;
    private final DataAnonymizationService anonymizationService;

    @Transactional(readOnly = true)
    public DataExportDTO exportPersonalData(UUID nutritionistId) {
        log.info("Exportando dados pessoais da nutricionista: {}", nutritionistId);

        Nutritionist nutritionist = nutritionistRepository.findById(nutritionistId)
                .orElseThrow(() -> new NutritionistNotFoundException(nutritionistId));

        Map<String, Object> personalData = new HashMap<>();
        personalData.put("name", nutritionist.getFullName());
        personalData.put("email", nutritionist.getUser().getEmail());
        personalData.put("phone", nutritionist.getPhone());
        personalData.put("crn", nutritionist.getCrn());

        Map<String, Object> professionalData = new HashMap<>();
        professionalData.put("specialty", nutritionist.getSpecialty());
        professionalData.put("clinicName", nutritionist.getClinicName());
        professionalData.put("plan", nutritionist.getSubscriptionPlan());

        List<Map<String, Object>> subscriptions = subscriptionRepository
                .findByNutritionistId(nutritionistId)
                .stream()
                .map(s -> {
                    Map<String, Object> sub = new HashMap<>();
                    sub.put("plan", s.getPlan());
                    sub.put("status", s.getStatus());
                    sub.put("amount", s.getAmount());
                    sub.put("start", s.getCurrentPeriodStart());
                    sub.put("end", s.getCurrentPeriodEnd());
                    return sub;
                })
                .collect(Collectors.toList());

        List<Map<String, Object>> payments = paymentRepository
                .findByNutritionistIdOrderByCreatedAtDesc(nutritionistId)
                .stream()
                .map(p -> {
                    Map<String, Object> payment = new HashMap<>();
                    payment.put("amount", p.getAmount());
                    payment.put("status", p.getStatus());
                    payment.put("method", p.getPaymentMethod());
                    payment.put("paidAt", p.getPaidAt());
                    return payment;
                })
                .collect(Collectors.toList());

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalPatients", patientRepository.countByNutritionistId(nutritionistId));
        stats.put("activePatients", patientRepository.countByNutritionistIdAndIsActive(nutritionistId, true));

        log.info("Exportacao de dados concluida para: {}", nutritionistId);

        return DataExportDTO.builder()
                .nutritionistId(nutritionistId)
                .exportedAt(LocalDateTime.now())
                .personalData(personalData)
                .professionalData(professionalData)
                .subscriptions(subscriptions)
                .payments(payments)
                .aggregatedStats(stats)
                .build();
    }

    public void anonymizePatient(UUID nutritionistId, UUID patientId, Boolean permanentDelete) {
        if (Boolean.TRUE.equals(permanentDelete)) {
            anonymizationService.permanentlyDeletePatient(nutritionistId, patientId);
        } else {
            anonymizationService.anonymizePatient(nutritionistId, patientId);
        }
    }

    @Transactional
    public void requestAccountDeletion(UUID nutritionistId) {
        log.warn("Solicitacao de exclusao de conta: {}", nutritionistId);

        Nutritionist nutritionist = nutritionistRepository.findById(nutritionistId)
                .orElseThrow(() -> new NutritionistNotFoundException(nutritionistId));

        // Anonimiza ao inves de deletar imediatamente (manter 30 dias para eventuais disputas)
        nutritionist.setFullName("Conta Removida");
        nutritionist.setPhone(null);
        nutritionist.setClinicName(null);
        nutritionist.getUser().setIsActive(false);
        nutritionist.getUser().setEmail("deleted_" + nutritionistId + "@removed.nutriprogress.com");

        nutritionistRepository.save(nutritionist);
        // User e salvo automaticamente pelo dirty-checking do Hibernate (mesma sessao transacional)

        log.warn("Conta marcada para remocao: {}", nutritionistId);
    }
}
