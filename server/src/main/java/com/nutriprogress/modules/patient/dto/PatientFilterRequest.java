package com.nutriprogress.modules.patient.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PatientFilterRequest {

    private String search;
    private Boolean isActive;

    @Builder.Default
    private Integer page = 0;

    @Builder.Default
    private Integer size = 20;

    @Builder.Default
    private String sortBy = "fullName";

    @Builder.Default
    private String sortDirection = "ASC";
}
