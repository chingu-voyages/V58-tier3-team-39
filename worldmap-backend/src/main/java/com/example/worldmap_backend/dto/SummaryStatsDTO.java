package com.example.worldmap_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SummaryStatsDTO {
    private Integer totalMembers;
    private Integer totalCountries;
    private Integer activeTeams;
    private Integer tierLevels;
}
