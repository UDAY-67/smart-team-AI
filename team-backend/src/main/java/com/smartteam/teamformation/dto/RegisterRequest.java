package com.smartteam.teamformation.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class RegisterRequest {
    
    @NotBlank
    private String fullName;
    
    @NotBlank
    @Email
    private String email;
    
    @NotBlank
    private String password;
    
    @NotBlank
    private String college;
    
    @NotBlank
    private String city;
    
    @NotEmpty
    private List<String> skills;
    
    @NotEmpty
    private List<String> domains;
    
    @NotBlank
    private String experienceLevel;
    
    private Integer skillScore;
}
