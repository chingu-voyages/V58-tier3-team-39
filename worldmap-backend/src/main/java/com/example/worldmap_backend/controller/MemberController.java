package com.example.worldmap_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.worldmap_backend.dto.CountryStats;
import com.example.worldmap_backend.dto.MemberFilter;
import com.example.worldmap_backend.entity.Member;
import com.example.worldmap_backend.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;


    @GetMapping
    public ResponseEntity<List<Member>> getMembers(
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) Integer yearJoined,
            @RequestParam(required = false) String roleType,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) Integer soloProjectTier,
            @RequestParam(required = false) Integer voyageTier,
            @RequestParam(required = false) String voyage) {

        MemberFilter filter = new MemberFilter(
            gender, country, yearJoined, roleType, role,
            soloProjectTier, voyageTier, voyage
        );

        
        boolean hasFilters = gender != null || country != null || yearJoined != null
            || roleType != null || role != null || soloProjectTier != null
            || voyageTier != null || voyage != null;

        List<Member> members = hasFilters
            ? memberService.getFilteredMembers(filter)
            : memberService.getAllMembers();

        return ResponseEntity.ok(members);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberById(@PathVariable Long id) {
        return memberService.getMemberById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping
    public ResponseEntity<Member> createMember(@RequestBody Member member) {
        Member savedMember = memberService.saveMember(member);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMember);
    }



    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(@PathVariable Long id, @RequestBody Member member) {
        return memberService.getMemberById(id)
                .map(existing -> {
                    member.setId(id);
                    Member updated = memberService.saveMember(member);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        if (memberService.getMemberById(id).isPresent()) {
            memberService.deleteMember(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @GetMapping("/stats/countries")
    public ResponseEntity<List<CountryStats>> getCountryStats() {
        List<CountryStats> stats = memberService.getCountryStats();
        return ResponseEntity.ok(stats);
    }
}

