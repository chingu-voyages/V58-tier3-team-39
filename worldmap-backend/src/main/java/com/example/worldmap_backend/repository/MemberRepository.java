package com.example.worldmap_backend.repository;

import com.example.worldmap_backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Member entity
 * Extends JpaSpecificationExecutor for dynamic query support
 */
@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, JpaSpecificationExecutor<Member> {

    /**
     * Custom query to count members by country
     * Returns array of [country_name, member_count]
     */
    @Query("SELECT m.country, COUNT(m) FROM Member m GROUP BY m.country ORDER BY COUNT(m) DESC")
    List<Object[]> countMembersByCountry();
}

