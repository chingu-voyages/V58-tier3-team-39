package com.example.worldmap_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for country statistics including member count and coordinates
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CountryStats {
    private String country;
    private Long memberCount;
    private Double latitude;
    private Double longitude;
}

