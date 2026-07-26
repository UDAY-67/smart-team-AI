package com.smartteam.teamformation.algorithm;

import com.smartteam.teamformation.dto.RecommendedCandidate;
import com.smartteam.teamformation.model.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * 4. COMPATIBILITY SCORE ENGINE
 * 
 * Purpose: Calculate overall team strength using a weighted scoring formula.
 * Formula Logic: Compatibility = (skillScore * 0.6) + (interestMatch * 0.4)
 */
@Component
public class CompatibilityEngine {

    /**
     * Calculates the compatibility score of the formed team.
     * 
     * @param team The list of recommended candidates in the team.
     * @param userMap A map to quickly look up full User profiles by their ID.
     * @return The compatibility percentage (0-100).
     */
    public double calculateTeamCompatibility(List<RecommendedCandidate> team, Map<String, User> userMap) {
        if (team == null || team.isEmpty()) {
            return 0.0;
        }

        double totalCompatibility = 0.0;
        int comparisons = 0;

        // Compare each member's domains/interests with others to find interestMatch
        for (int i = 0; i < team.size(); i++) {
            User memberA = userMap.get(team.get(i).getId());
            int skillScoreA = memberA.getSkillScore() != null ? memberA.getSkillScore() : 0;
            
            double memberInterestScore = 0.0;
            int peerComparisons = 0;

            for (int j = 0; j < team.size(); j++) {
                if (i == j) continue;
                
                User memberB = userMap.get(team.get(j).getId());
                memberInterestScore += calculateInterestMatch(memberA.getDomains(), memberB.getDomains());
                peerComparisons++;
            }

            double averageInterestMatch = peerComparisons > 0 ? (memberInterestScore / peerComparisons) : 100.0; // 100 if solo team

            // Apply weighted formula: (skillScore * 0.6) + (interestMatch * 0.4)
            double memberCompatibility = (skillScoreA * 0.6) + (averageInterestMatch * 0.4);
            totalCompatibility += memberCompatibility;
            comparisons++;
        }

        return comparisons > 0 ? (totalCompatibility / comparisons) : 0.0;
    }

    /**
     * Calculates the percentage of matching domains/interests between two users.
     */
    private double calculateInterestMatch(List<String> domainsA, List<String> domainsB) {
        if (domainsA == null || domainsA.isEmpty() || domainsB == null || domainsB.isEmpty()) {
            return 0.0;
        }

        int matches = 0;
        for (String a : domainsA) {
            for (String b : domainsB) {
                if (a.equalsIgnoreCase(b)) {
                    matches++;
                    break;
                }
            }
        }

        // Percentage based on the smaller list of interests to not penalize users with many interests
        int minSize = Math.min(domainsA.size(), domainsB.size());
        return (double) matches / minSize * 100.0;
    }
}
