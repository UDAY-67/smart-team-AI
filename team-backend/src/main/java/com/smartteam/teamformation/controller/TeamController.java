package com.smartteam.teamformation.controller;

import com.smartteam.teamformation.dto.RecommendationRequest;
import com.smartteam.teamformation.dto.RecommendationResponse;
import com.smartteam.teamformation.service.RecommendationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/team")
@RequiredArgsConstructor
public class TeamController {

    private final RecommendationService recommendationService;

    @PostMapping("/recommend")
    public ResponseEntity<RecommendationResponse> recommendTeam(@Valid @RequestBody RecommendationRequest request) {
        return ResponseEntity.ok(recommendationService.recommendTeam(request));
    }
}
