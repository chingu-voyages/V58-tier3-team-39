package com.example.worldmap_backend.specification;

import com.example.worldmap_backend.dto.MemberFilter;
import com.example.worldmap_backend.entity.Member;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


public class MemberSpecification {


    public static Specification<Member> filterMembers(MemberFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.getGender() != null && !filter.getGender().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("gender"), filter.getGender()));
            }

            if (filter.getCountry() != null && !filter.getCountry().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("country"), filter.getCountry()));
            }

                if (filter.getYearJoined() != null) {
                    predicates.add(criteriaBuilder.equal(root.get("joinYear"), filter.getYearJoined()));
            }

            if (filter.getRoleType() != null && !filter.getRoleType().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("roleType"), filter.getRoleType()));
            }

            if (filter.getRole() != null && !filter.getRole().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("voyageRole"), filter.getRole()));
            }

            if (filter.getSoloProjectTier() != null) {
                predicates.add(criteriaBuilder.equal(root.get("soloProjectTier"), filter.getSoloProjectTier()));
            }

            if (filter.getVoyageTier() != null) {
                predicates.add(criteriaBuilder.equal(root.get("voyageTier"), filter.getVoyageTier()));
            }

            if (filter.getVoyage() != null && !filter.getVoyage().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("voyage"), filter.getVoyage()));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}

