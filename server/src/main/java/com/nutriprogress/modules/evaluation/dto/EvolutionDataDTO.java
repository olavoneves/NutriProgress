package com.nutriprogress.modules.evaluation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EvolutionDataDTO {

    private UUID patientId;
    private String patientName;

    private List<DataPointDTO> weightEvolution;
    private List<DataPointDTO> bmiEvolution;
    private List<DataPointDTO> bodyFatEvolution;
    private List<DataPointDTO> muscleMassEvolution;

    private EvolutionComparisonDTO comparison;
}
