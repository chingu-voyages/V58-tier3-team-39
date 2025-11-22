package com.example.worldmap_backend.controller;

import com.example.worldmap_backend.dto.CountryStats;
import com.example.worldmap_backend.dto.MemberFilter;
import com.example.worldmap_backend.entity.Member;
import com.example.worldmap_backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class MemberController {

    private final MemberService memberService;

    /**
     * Get all members or filtered members based on query parameters
     *
     * @param gender filter by gender
     * @param country filter by country
     * @param joinYear filter by join year
     * @param roleType filter by role type
     * @param role filter by role
     * @param soloProjectTier filter by solo project tier
     * @param voyageTier filter by voyage tier
     * @param voyage filter by voyage
     * @return list of members
     */
    @GetMapping
    public ResponseEntity<List<Member>> getMembers(
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) Integer joinYear,
            @RequestParam(required = false) String roleType,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) Integer soloProjectTier,
            @RequestParam(required = false) Integer voyageTier,
            @RequestParam(required = false) String voyage) {

        MemberFilter filter = new MemberFilter(
                gender, country, joinYear, roleType, role,
                soloProjectTier, voyageTier, voyage
        );

        // Check if any filter is applied
        boolean hasFilters = gender != null || country != null || joinYear != null
                || roleType != null || role != null || soloProjectTier != null
                || voyageTier != null || voyage != null;

        List<Member> members = hasFilters
                ? memberService.getFilteredMembers(filter)
                : memberService.getAllMembers();

        return ResponseEntity.ok(members);
    }

    /**
     * Get a single member by ID
     *
     * @param id member ID
     * @return member details
     */
    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable Long id) {
        return memberService.getMemberById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Create a new member
     *
     * @param member member to create
     * @return created member
     */
    @PostMapping
    public ResponseEntity<Member> createMember(@RequestBody Member member) {
        Member savedMember = memberService.saveMember(member);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMember);
    }

    /**
     * Get country statistics with member counts and coordinates
     *
     * @return list of country statistics
     */
    @GetMapping("/stats/countries")
    public ResponseEntity<List<CountryStats>> getCountryStats() {
        List<CountryStats> stats = memberService.getCountryStats();
        return ResponseEntity.ok(stats);
    }
}

