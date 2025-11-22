package com.example.worldmap_backend.config;

import com.example.worldmap_backend.entity.Member;
import com.example.worldmap_backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final MemberRepository memberRepository;

    @Override
    public void run(String... args) {
        // Only initialize if database is empty
        if (memberRepository.count() == 0) {
            log.info("Initializing database with sample member data...");

            List<Member> sampleMembers = Arrays.asList(
                    createMember(null, "Female", "United States", "Voyage", "Developer", null, 3, "V58", LocalDateTime.of(2024, 1, 15, 10, 0)),
                    createMember(null, "Male", "United Kingdom", "Voyage", "Product Owner", null, 2, "V57", LocalDateTime.of(2023, 10, 20, 14, 30)),
                    createMember(null, "Non-binary", "Canada", "Solo Project", "Developer", 2, null, null, LocalDateTime.of(2023, 5, 5, 9, 15)),
                    createMember(null, "Female", "Germany", "Voyage", "Developer", null, 1, "V56", LocalDateTime.of(2023, 7, 12, 16, 45)),
                    createMember(null, "Male", "India", "Voyage", "Developer", null, 3, "V58", LocalDateTime.of(2024, 2, 1, 11, 20)),
                    createMember(null, "Female", "Australia", "Solo Project", "Developer", 3, null, null, LocalDateTime.of(2022, 11, 8, 8, 30)),
                    createMember(null, "Male", "Brazil", "Voyage", "Scrum Master", null, 2, "V57", LocalDateTime.of(2023, 9, 18, 13, 0)),
                    createMember(null, "Female", "Nigeria", "Voyage", "Developer", null, 1, "V55", LocalDateTime.of(2023, 3, 22, 15, 10)),
                    createMember(null, "Male", "United States", "Solo Project", "Developer", 1, null, null, LocalDateTime.of(2024, 1, 30, 10, 45)),
                    createMember(null, "Female", "France", "Voyage", "UI/UX Designer", null, 2, "V56", LocalDateTime.of(2023, 6, 14, 12, 20))
            );

            memberRepository.saveAll(sampleMembers);
            log.info("Successfully initialized {} sample members", sampleMembers.size());
        } else {
            log.info("Database already contains {} members, skipping initialization", memberRepository.count());
        }
    }

    private Member createMember(Long id, String gender, String country, String roleType,
                                String role, Integer soloProjectTier, Integer voyageTier,
                                String voyage, LocalDateTime timestamp) {
        Member member = new Member();
        member.setId(id);
        member.setGender(gender);
        member.setCountry(country);
        member.setRoleType(roleType);
        member.setRole(role);
        member.setSoloProjectTier(soloProjectTier);
        member.setVoyageTier(voyageTier);
        member.setVoyage(voyage);
        member.setTimestamp(timestamp);
        member.setJoinYear(timestamp.getYear());
        return member;
    }
}

