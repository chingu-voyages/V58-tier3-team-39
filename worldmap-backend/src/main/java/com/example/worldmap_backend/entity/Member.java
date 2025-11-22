package com.example.worldmap_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "members")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "gender")
    private String gender;

    @Column(name = "country")
    private String country;

    @Column(name = "role_type")
    private String roleType;

    @Column(name = "role")
    private String role;

    @Column(name = "solo_project_tier")
    private Integer soloProjectTier;

    @Column(name = "voyage_tier")
    private Integer voyageTier;

    @Column(name = "voyage")
    private String voyage;

    @Column(name = "join_year")
    private Integer joinYear;

    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    @PrePersist
    @PreUpdate
    public void updateJoinYear() {
        if (timestamp != null) {
            this.joinYear = timestamp.getYear();
        }
    }
}

