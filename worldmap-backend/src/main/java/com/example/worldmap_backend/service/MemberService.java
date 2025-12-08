package com.example.worldmap_backend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.worldmap_backend.dto.ChartDataDTO;
import com.example.worldmap_backend.dto.CommonValueDTO;
import com.example.worldmap_backend.dto.CountryStats;
import com.example.worldmap_backend.dto.DemographicsStatsDTO;
import com.example.worldmap_backend.dto.EnhancedCountryStatsDTO;
import com.example.worldmap_backend.dto.MemberFilter;
import com.example.worldmap_backend.dto.SummaryStatsDTO;
import com.example.worldmap_backend.entity.Member;
import com.example.worldmap_backend.repository.MemberRepository;
import com.example.worldmap_backend.specification.MemberSpecification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    // dummy data
    private static final Map<String, double[]> COUNTRY_COORDINATES = new HashMap<>();

    static {
        COUNTRY_COORDINATES.put("United States", new double[]{37.0902, -95.7129});
        COUNTRY_COORDINATES.put("United Kingdom", new double[]{55.3781, -3.4360});
        COUNTRY_COORDINATES.put("Canada", new double[]{56.1304, -106.3468});
        COUNTRY_COORDINATES.put("Germany", new double[]{51.1657, 10.4515});
        COUNTRY_COORDINATES.put("India", new double[]{20.5937, 78.9629});
        COUNTRY_COORDINATES.put("Australia", new double[]{-25.2744, 133.7751});
        COUNTRY_COORDINATES.put("Brazil", new double[]{-14.2350, -51.9253});
        COUNTRY_COORDINATES.put("Nigeria", new double[]{9.0820, 8.6753});
        COUNTRY_COORDINATES.put("France", new double[]{46.2276, 2.2137});
        COUNTRY_COORDINATES.put("Spain", new double[]{40.4637, -3.7492});
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> getMemberById(Long id) {
        return memberRepository.findById(id);
    }

    public List<Member> getFilteredMembers(MemberFilter filter) {
        return memberRepository.findAll(MemberSpecification.filterMembers(filter));
    }

    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }

    public List<CountryStats> getCountryStats() {
        List<Object[]> results = memberRepository.countMembersByCountry();

        return results.stream()
                .map(result -> {
                    String country = (String) result[0];
                    Long count = (Long) result[1];
                    double[] coords = COUNTRY_COORDINATES.get(country);

                    if (coords != null) {
                        return new CountryStats(country, count, coords[0], coords[1]);
                    } else {
                        return new CountryStats(country, count, null, null);
                    }
                })
                .collect(Collectors.toList());
    }

    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }

    
    public DemographicsStatsDTO getDemographicsStats(MemberFilter filter) {
        List<Member> members = filter != null 
            ? getFilteredMembers(filter) 
            : getAllMembers();

        // Role distribution
        Map<String, Integer> roleCounts = new HashMap<>();
        members.forEach(m -> {
            String role = m.getVoyageRole();
            if (role != null && !role.isEmpty()) {
                roleCounts.put(role, roleCounts.getOrDefault(role, 0) + 1);
            }
        });
        List<ChartDataDTO> roleChart = roleCounts.entrySet().stream()
            .map(e -> new ChartDataDTO(e.getKey(), e.getValue()))
            .collect(Collectors.toList());

        // Gender distribution
        Map<String, Integer> genderCounts = new HashMap<>();
        members.forEach(m -> {
            String gender = m.getGender();
            if (gender != null && !gender.isEmpty()) {
                genderCounts.put(gender, genderCounts.getOrDefault(gender, 0) + 1);
            }
        });
        List<ChartDataDTO> genderChart = genderCounts.entrySet().stream()
            .map(e -> new ChartDataDTO(e.getKey(), e.getValue()))
            .collect(Collectors.toList());

        // Common location
        Map<String, Integer> countryCounts = new HashMap<>();
        members.forEach(m -> {
            String country = m.getCountry();
            if (country != null && !country.isEmpty()) {
                countryCounts.put(country, countryCounts.getOrDefault(country, 0) + 1);
            }
        });
        CommonValueDTO commonLocation = countryCounts.entrySet().stream()
            .max(Map.Entry.comparingByValue())
            .map(e -> new CommonValueDTO(e.getKey(), e.getValue()))
            .orElse(null);

        // Common role
        CommonValueDTO commonRole = roleCounts.entrySet().stream()
            .max(Map.Entry.comparingByValue())
            .map(e -> new CommonValueDTO(e.getKey(), e.getValue()))
            .orElse(null);

        // Common tier
        Map<String, Integer> tierCounts = new HashMap<>();
        members.forEach(m -> {
            String tier = m.getVoyageTier();
            if (tier != null && !tier.isEmpty()) {
                tierCounts.put(tier, tierCounts.getOrDefault(tier, 0) + 1);
            }
        });
        CommonValueDTO commonTier = tierCounts.entrySet().stream()
            .max(Map.Entry.comparingByValue())
            .map(e -> new CommonValueDTO(e.getKey(), e.getValue()))
            .orElse(null);

        return new DemographicsStatsDTO(roleChart, genderChart, commonLocation, commonRole, commonTier);
    }

    public List<EnhancedCountryStatsDTO> getEnhancedCountryStats(MemberFilter filter) {
        List<Member> members = filter != null 
            ? getFilteredMembers(filter) 
            : getAllMembers();

        Map<String, List<Member>> membersByCountry = members.stream()
            .filter(m -> m.getCountry() != null && !m.getCountry().isEmpty())
            .collect(Collectors.groupingBy(Member::getCountry));

        List<EnhancedCountryStatsDTO> stats = new ArrayList<>();

        membersByCountry.forEach((country, countryMembers) -> {
            double[] coords = COUNTRY_COORDINATES.get(country);
            
            // Top role
            Map<String, Long> roleCounts = countryMembers.stream()
                .filter(m -> m.getVoyageRole() != null && !m.getVoyageRole().isEmpty())
                .collect(Collectors.groupingBy(Member::getVoyageRole, Collectors.counting()));
            String topRole = roleCounts.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("Unknown");

            // Common gender
            Map<String, Long> genderCounts = countryMembers.stream()
                .filter(m -> m.getGender() != null && !m.getGender().isEmpty())
                .collect(Collectors.groupingBy(Member::getGender, Collectors.counting()));
            String commonGender = genderCounts.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("Unknown");

            // Get country code
            String countryCode = countryMembers.stream()
                .map(Member::getCountryCode)
                .filter(code -> code != null && !code.isEmpty())
                .findFirst()
                .orElse(null);

            stats.add(new EnhancedCountryStatsDTO(
                country,
                countryCode,
                coords != null ? coords[0] : null,
                coords != null ? coords[1] : null,
                countryMembers.size(),
                topRole,
                commonGender
            ));
        });

        return stats.stream()
            .sorted((a, b) -> b.getCount().compareTo(a.getCount()))
            .collect(Collectors.toList());
    }

    public SummaryStatsDTO getSummaryStats() {
        List<Member> allMembers = getAllMembers();
        
        int totalMembers = allMembers.size();
        
        long totalCountries = allMembers.stream()
            .map(Member::getCountry)
            .filter(c -> c != null && !c.isEmpty())
            .distinct()
            .count();

        
        int activeTeams = 30; // Placeholder
        int tierLevels = 3;   // Placeholder

        return new SummaryStatsDTO(
            totalMembers,
            (int) totalCountries,
            activeTeams,
            tierLevels
        );
    }
}

