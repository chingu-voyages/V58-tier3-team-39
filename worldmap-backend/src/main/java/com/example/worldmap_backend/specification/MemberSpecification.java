package com.example.worldmap_backend.specification;

import com.example.worldmap_backend.dto.MemberFilter;
import com.example.worldmap_backend.entity.Member;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

/**
 * JPA Specification for dynamic member filtering
 * Builds queries based on non-null filter criteria
 */
public class MemberSpecification {

    /**
     * Creates a dynamic specification based on the provided filter
     * Only adds predicates for non-null filter fields
     *
     * @param filter the filter criteria
     * @return Specification for querying members
     */
    public static Specification<Member> filterMembers(MemberFilter filter) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.getGender() != null && !filter.getGender().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("gender"), filter.getGender()));
            }

            if (filter.getCountry() != null && !filter.getCountry().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("country"), filter.getCountry()));
            }

            if (filter.getJoinYear() != null) {
                predicates.add(criteriaBuilder.equal(root.get("joinYear"), filter.getJoinYear()));
            }

            if (filter.getRoleType() != null && !filter.getRoleType().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("roleType"), filter.getRoleType()));
            }

            if (filter.getRole() != null && !filter.getRole().isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("role"), filter.getRole()));
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

