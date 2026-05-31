package com.nutriprogress.modules.lgpd.service;

import com.nutriprogress.modules.patient.entity.Patient;
import com.nutriprogress.modules.patient.exception.PatientNotFoundException;
import com.nutriprogress.modules.patient.exception.UnauthorizedPatientAccessException;
import com.nutriprogress.modules.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class DataAnonymizationService {

    private final PatientRepository patientRepository;

    @Transactional
    public void anonymizePatient(UUID nutritionistId, UUID patientId) {
        log.info("Anonimizando dados do paciente {} (nutricionista {})", patientId, nutritionistId);

        Patient patient = patientRepository.findByIdAndNutritionistId(patientId, nutritionistId)
                .orElseThrow(() -> patientRepository.existsById(patientId)
                        ? new UnauthorizedPatientAccessException(patientId, nutritionistId)
                        : new PatientNotFoundException(patientId));

        patient.setFullName("Paciente Anonimo " + patientId.toString().substring(0, 8));
        patient.setEmail(null);
        patient.setPhone(null);
        patient.setNotes("Dados anonimizados conforme solicitacao LGPD");
        patient.setIsActive(false);

        patientRepository.save(patient);
        log.info("Paciente {} anonimizado com sucesso", patientId);
    }

    @Transactional
    public void permanentlyDeletePatient(UUID nutritionistId, UUID patientId) {
        log.warn("EXCLUSAO PERMANENTE do paciente {} (nutricionista {})", patientId, nutritionistId);

        Patient patient = patientRepository.findByIdAndNutritionistId(patientId, nutritionistId)
                .orElseThrow(() -> patientRepository.existsById(patientId)
                        ? new UnauthorizedPatientAccessException(patientId, nutritionistId)
                        : new PatientNotFoundException(patientId));

        patientRepository.delete(patient);
        log.warn("Paciente {} removido permanentemente", patientId);
    }
}
