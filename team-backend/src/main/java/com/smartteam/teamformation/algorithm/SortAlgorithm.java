package com.smartteam.teamformation.algorithm;

import com.smartteam.teamformation.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 2. SORTING ALGORITHM
 * 
 * Purpose: Rank candidates based on skillScore and experience level.
 * Implementation: Merge Sort (O(n log n) complexity)
 * DAA-oriented sorting logic, avoiding built-in Collections.sort().
 */
@Component
public class SortAlgorithm {

    /**
     * Sorts the users in descending order based on their rank (skillScore + experience).
     * Time Complexity: O(n log n)
     * Space Complexity: O(n) for auxiliary arrays in merge step.
     */
    public List<User> sortCandidates(List<User> users) {
        if (users == null || users.size() <= 1) {
            return users;
        }

        // Convert to array for in-place Merge Sort, then back to list
        User[] array = users.toArray(new User[0]);
        mergeSort(array, 0, array.length - 1);

        return List.of(array);
    }

    private void mergeSort(User[] array, int left, int right) {
        if (left < right) {
            int mid = left + (right - left) / 2;

            mergeSort(array, left, mid);
            mergeSort(array, mid + 1, right);

            merge(array, left, mid, right);
        }
    }

    private void merge(User[] array, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        User[] L = new User[n1];
        User[] R = new User[n2];

        System.arraycopy(array, left, L, 0, n1);
        System.arraycopy(array, mid + 1, R, 0, n2);

        int i = 0, j = 0;
        int k = left;

        while (i < n1 && j < n2) {
            // Compare based on rank logic (descending order)
            if (calculateRankValue(L[i]) >= calculateRankValue(R[j])) {
                array[k] = L[i];
                i++;
            } else {
                array[k] = R[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            array[k] = L[i];
            i++;
            k++;
        }

        while (j < n2) {
            array[k] = R[j];
            j++;
            k++;
        }
    }

    /**
     * Computes a ranking value for sorting purposes.
     * We consider skillScore primarily, and add a bonus for experience level.
     */
    private double calculateRankValue(User user) {
        int baseScore = user.getSkillScore() != null ? user.getSkillScore() : 0;
        int expBonus = 0;
        
        if (user.getExperienceLevel() != null) {
            switch (user.getExperienceLevel().toLowerCase()) {
                case "expert": expBonus = 20; break;
                case "advanced": expBonus = 15; break;
                case "intermediate": expBonus = 10; break;
                case "beginner": expBonus = 5; break;
                default: expBonus = 0; break;
            }
        }
        return baseScore + expBonus;
    }
}
