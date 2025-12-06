package com.example.worldmap_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DemographicsStatsDTO {
    private List<ChartDataDTO> roleChart;
    private List<ChartDataDTO> genderChart;
    private CommonValueDTO commonLocation;
    private CommonValueDTO commonRole;
    private CommonValueDTO commonTier;
}
