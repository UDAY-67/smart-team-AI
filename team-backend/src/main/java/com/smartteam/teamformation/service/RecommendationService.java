package com.smartteam.teamformation.service;

import com.smartteam.teamformation.algorithm.CompatibilityEngine;
import com.smartteam.teamformation.algorithm.GreedyAlgorithm;
import com.smartteam.teamformation.algorithm.SearchAlgorithm;
import com.smartteam.teamformation.algorithm.SortAlgorithm;
import com.smartteam.teamformation.dto.RecommendationRequest;
import com.smartteam.teamformation.dto.RecommendationResponse;
import com.smartteam.teamformation.dto.RecommendedCandidate;
import com.smartteam.teamformation.model.User;
import com.smartteam.teamformation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final UserRepository userRepository;
    private final SearchAlgorithm searchAlgorithm;
    private final SortAlgorithm sortAlgorithm;
    private final GreedyAlgorithm greedyAlgorithm;
    private final CompatibilityEngine compatibilityEngine;

    /**
     * DAA RECOMMENDATION FLOW
     * 1. Search module finds matching profiles
     * 2. Sorting module ranks candidates
     * 3. Greedy algorithm selects optimized team
     * 4. Compatibility engine calculates score
     */
    public RecommendationResponse recommendTeam(RecommendationRequest request) {
        // Fetch all users once
        List<User> allUsers = userRepository.findAll();
        
        // Ensure no empty skill lists
        if (request.getRequiredSkills() == null || request.getRequiredSkills().isEmpty()) {
            return new RecommendationResponse(new ArrayList<>(), 0.0);
        }

        List<User> matchingCandidates = new ArrayList<>();
        
        // 1. SEARCHING ALGORITHM
        // For each skill required, find all users that have that skill and pool them.
        for (String skill : request.getRequiredSkills()) {
            List<User> candidatesWithSkill = searchAlgorithm.searchBySkill(allUsers, skill);
            for (User u : candidatesWithSkill) {
                if (!matchingCandidates.contains(u)) {
                    matchingCandidates.add(u);
                }
            }
        }

        // 2. SORTING ALGORITHM
        // Rank candidates based on skillScore and experience
        List<User> rankedCandidates = sortAlgorithm.sortCandidates(matchingCandidates);

        // 3. GREEDY ALGORITHM
        // Select the optimized team, avoiding overlap for roles
        List<RecommendedCandidate> recommendedTeam = greedyAlgorithm.selectOptimalTeam(request.getRequiredSkills(), rankedCandidates);

        // 4. COMPATIBILITY SCORE ENGINE
        // Create a user map for quick lookup
        Map<String, User> userMap = new HashMap<>();
        for (User u : allUsers) {
            userMap.put(u.getId(), u);
        }
        
        double compatibilityScore = compatibilityEngine.calculateTeamCompatibility(recommendedTeam, userMap);

        // 5. Final Recommendation Response
        return RecommendationResponse.builder()
                .recommendedTeam(recommendedTeam)
                .compatibilityScore(Math.round(compatibilityScore * 100.0) / 100.0) // Round to 2 decimals
                .build();
    }
}
