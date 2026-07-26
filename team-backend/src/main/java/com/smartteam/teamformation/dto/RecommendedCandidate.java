package com.smartteam.teamformation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecommendedCandidate {
    
    private String id;
    private String name;
    private String role;
    private int skillScore;
}
