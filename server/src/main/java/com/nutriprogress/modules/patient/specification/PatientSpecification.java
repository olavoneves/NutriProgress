package com.nutriprogress.modules.patient.specification;

import com.nutriprogress.modules.patient.dto.PatientFilterRequest;
import com.nutriprogress.modules.patient.entity.Patient;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class PatientSpecification {

    public static Specification<Patient> withFilters(UUID nutritionistId, PatientFilterRequest filters) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Sempre filtrar por nutricionista (segurança / ownership)
            predicates.add(cb.equal(root.get("nutritionist").get("id"), nutritionistId));

            if (filters.getIsActive() != null) {
                predicates.add(cb.equal(root.get("isActive"), filters.getIsActive()));
            }

            if (filters.getSearch() != null && !filters.getSearch().isBlank()) {
                String pattern = "%" + filters.getSearch().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get("fullName")), pattern));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
