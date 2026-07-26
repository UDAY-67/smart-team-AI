package com.smartteam.teamformation.algorithm;

import com.smartteam.teamformation.dto.RecommendedCandidate;
import com.smartteam.teamformation.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 3. GREEDY ALGORITHM
 * 
 * Purpose: Generate the best optimized team.
 * Logic: Select the highest-ranked suitable candidate, avoid duplicate role conflicts,
 * maximize overall team quality.
 */
@Component
public class GreedyAlgorithm {

    /**
     * Forms a team greedily by picking the best candidate for each required skill.
     * 
     * @param requiredSkills The skills needed for the team (roles).
     * @param rankedCandidates A pre-sorted list of candidates (best first).
     * @return A list of RecommendedCandidate objects forming the team.
     */
    public List<RecommendedCandidate> selectOptimalTeam(List<String> requiredSkills, List<User> rankedCandidates) {
        List<RecommendedCandidate> team = new ArrayList<>();
        Set<String> selectedUserIds = new HashSet<>();

        for (String skill : requiredSkills) {
            User bestMatch = null;

            // Greedily pick the first candidate that matches the skill and isn't already selected
            for (User candidate : rankedCandidates) {
                if (selectedUserIds.contains(candidate.getId())) {
                    continue; // Skip already selected members
                }
                
                // Check if candidate has the required skill
                boolean hasSkill = false;
                if (candidate.getSkills() != null) {
                    for (String candSkill : candidate.getSkills()) {
                        if (candSkill.equalsIgnoreCase(skill)) {
                            hasSkill = true;
                            break;
                        }
                    }
                }

                if (hasSkill) {
                    bestMatch = candidate;
                    break; // Found the best match because the list is sorted by rank
                }
            }

            if (bestMatch != null) {
                selectedUserIds.add(bestMatch.getId());
                team.add(RecommendedCandidate.builder()
                        .id(bestMatch.getId())
                        .name(bestMatch.getFullName())
                        .role(skill) // Assigned role based on the requested skill
                        .skillScore(bestMatch.getSkillScore() != null ? bestMatch.getSkillScore() : 0)
                        .build());
            }
        }

        return team;
    }
}
