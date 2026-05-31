package com.nutriprogress.modules.audit.aspect;

import com.nutriprogress.modules.audit.service.AuditService;
import com.nutriprogress.modules.nutritionist.dto.NutritionistDTO;
import com.nutriprogress.modules.nutritionist.service.NutritionistService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Slf4j
@Aspect
@Component
@RequiredArgsConstructor
public class AuditAspect {

    private final AuditService auditService;
    private final NutritionistService nutritionistService;

    @AfterReturning(
            pointcut = "execution(* com.nutriprogress.modules.patient.service.PatientService.create(..))",
            returning = "result"
    )
    public void auditPatientCreated(JoinPoint joinPoint, Object result) {
        auditAction("CREATE", "PATIENT", extractId(result));
    }

    @AfterReturning(
            pointcut = "execution(* com.nutriprogress.modules.patient.service.PatientService.findById(..))",
            returning = "result"
    )
    public void auditPatientRead(JoinPoint joinPoint, Object result) {
        auditAction("READ", "PATIENT", extractId(result));
    }

    @AfterReturning(
            pointcut = "execution(* com.nutriprogress.modules.patient.service.PatientService.update(..))",
            returning = "result"
    )
    public void auditPatientUpdated(JoinPoint joinPoint, Object result) {
        auditAction("UPDATE", "PATIENT", extractId(result));
    }

    @AfterReturning(
            pointcut = "execution(* com.nutriprogress.modules.patient.service.PatientService.archive(..))"
    )
    public void auditPatientArchived(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        if (args.length >= 2) {
            auditAction("ARCHIVE", "PATIENT", args[1].toString());
        }
    }

    @AfterReturning(
            pointcut = "execution(* com.nutriprogress.modules.evaluation.service.EvaluationService.create(..))",
            returning = "result"
    )
    public void auditEvaluationCreated(JoinPoint joinPoint, Object result) {
        auditAction("CREATE", "EVALUATION", extractId(result));
    }

    // ======================================================================

    private void auditAction(String action, String resourceType, String resourceId) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth == null || !auth.isAuthenticated()) return;

            // Padrao do projeto: usar authentication.getName() (email) para resolver o nutritionist
            NutritionistDTO nutritionist = nutritionistService.findByUserEmail(auth.getName());

            String ipAddress = null;
            String httpMethod = null;
            String endpoint = null;
            String userAgent = null;

            HttpServletRequest request = getCurrentRequest();
            if (request != null) {
                ipAddress = extractIpAddress(request);
                httpMethod = request.getMethod();
                endpoint = request.getRequestURI();
                userAgent = request.getHeader("User-Agent");
            }

            auditService.log(
                    nutritionist.userId(),    // NutritionistDTO e record: accessor .userId()
                    nutritionist.id(),        // NutritionistDTO e record: accessor .id()
                    action,
                    resourceType,
                    resourceId,
                    httpMethod,
                    endpoint,
                    ipAddress,
                    userAgent,
                    200
            );
        } catch (Exception e) {
            log.warn("Falha ao auditar acao {}: {}", action, e.getMessage());
        }
    }

    private HttpServletRequest getCurrentRequest() {
        try {
            return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        } catch (Exception e) {
            return null;
        }
    }

    private String extractId(Object result) {
        if (result == null) return null;
        try {
            // PatientDTO e EvaluationDTO sao classes @Data com getId()
            return result.getClass().getMethod("getId").invoke(result).toString();
        } catch (Exception e) {
            return null;
        }
    }

    private String extractIpAddress(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip != null && !ip.isBlank()) {
            return ip.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
