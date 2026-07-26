package com.smartteam.teamformation.algorithm;

import com.smartteam.teamformation.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 1. SEARCHING ALGORITHM
 * 
 * Purpose: Search matching students based on required skills.
 * Implementation: Linear Search (O(n) complexity)
 * Extensible design allows upgrading to Binary Search in the future.
 */
@Component
public class SearchAlgorithm {

    /**
     * Linearly searches through the user list to find candidates that match a specific skill.
     * Time Complexity: O(n) where n is the total number of users.
     * Space Complexity: O(k) where k is the number of matching users.
     * 
     * @param users The full list of users to search through.
     * @param requiredSkill The skill we are searching for (e.g., "Frontend").
     * @return A list of users containing the requested skill.
     */
    public List<User> searchBySkill(List<User> users, String requiredSkill) {
        List<User> matchingCandidates = new ArrayList<>();
        
        // Linear Search implementation
        for (User user : users) {
            if (user.getSkills() != null) {
                for (String skill : user.getSkills()) {
                    if (skill.equalsIgnoreCase(requiredSkill)) {
                        matchingCandidates.add(user);
                        break; // Move to the next user once a match is found
                    }
                }
            }
        }
        
        return matchingCandidates;
    }
}
