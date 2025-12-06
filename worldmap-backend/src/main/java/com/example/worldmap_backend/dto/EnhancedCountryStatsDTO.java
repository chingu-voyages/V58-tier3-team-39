package com.example.worldmap_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnhancedCountryStatsDTO {
    private String countryName;
    private String countryCode;
    private Double latitude;
    private Double longitude;
    private Integer count;
    private String topRole;
    private String commonGender;
}
