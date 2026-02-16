package br.com.api.server.nutritionist.domain.dto;


import java.util.UUID;

public record NutritionistData(UUID id,
                               String name,
                               String email,
                               String crn,
                               String phone,
                               String clinicName) {
}
