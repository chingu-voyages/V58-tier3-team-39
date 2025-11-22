package com.example.worldmap_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for filtering members based on various criteria
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberFilter {
    private String gender;
    private String country;
    private Integer joinYear;
    private String roleType;
    private String role;
    private Integer soloProjectTier;
    private Integer voyageTier;
    private String voyage;
}

