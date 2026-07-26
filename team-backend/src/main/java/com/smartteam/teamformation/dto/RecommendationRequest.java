package com.smartteam.teamformation.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class RecommendationRequest {
    
    @NotEmpty
    private List<String> requiredSkills;
}
