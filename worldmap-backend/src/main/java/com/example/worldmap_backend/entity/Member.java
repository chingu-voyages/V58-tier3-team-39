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

    @Column(name = "timestamp")
    private LocalDateTime timestamp;

    @Column(name = "gender")
    private String gender;

    @Column(name = "country_code")
    private String countryCode;

    @Column(name = "timezone")
    private String timezone;

    @Column(name = "goal")
    private String goal;

    @Column(name = "goal_other", columnDefinition = "TEXT")
    private String goalOther;

    @Column(name = "source")
    private String source;

    @Column(name = "source_other", columnDefinition = "TEXT")
    private String sourceOther;

    @Column(name = "country")
    private String country;

    @Column(name = "solo_project_tier", columnDefinition = "TEXT")
    private String soloProjectTier;

    @Column(name = "role_type")
    private String roleType;

    @Column(name = "voyage_role")
    private String voyageRole;

    @Column(name = "voyage", columnDefinition = "TEXT")
    private String voyage;

    @Column(name = "voyage_tier", columnDefinition = "TEXT")
    private String voyageTier;

    @Column(name = "join_year")
    private Integer joinYear;


    @PrePersist
    @PreUpdate
    public void updateJoinYear() {
        if (timestamp != null) {
            this.joinYear = timestamp.getYear();
        }
    }
}
