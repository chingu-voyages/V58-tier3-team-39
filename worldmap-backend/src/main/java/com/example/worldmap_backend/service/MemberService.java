package com.example.worldmap_backend.service;

import com.example.worldmap_backend.dto.CountryStats;
import com.example.worldmap_backend.dto.MemberFilter;
import com.example.worldmap_backend.entity.Member;
import com.example.worldmap_backend.repository.MemberRepository;
import com.example.worldmap_backend.specification.MemberSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    // Approximate coordinates for countries (for map visualization) dummy data
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
}

