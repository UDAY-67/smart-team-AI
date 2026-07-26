package com.smartteam.teamformation.service;

import com.smartteam.teamformation.model.User;
import com.smartteam.teamformation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public List<User> getAllProfiles() {
        return userRepository.findAll();
    }

    public User getProfileById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateProfile(String id, User updatedProfile) {
        User existingUser = getProfileById(id);
        
        if (updatedProfile.getFullName() != null) existingUser.setFullName(updatedProfile.getFullName());
        if (updatedProfile.getCollege() != null) existingUser.setCollege(updatedProfile.getCollege());
        if (updatedProfile.getCity() != null) existingUser.setCity(updatedProfile.getCity());
        if (updatedProfile.getSkills() != null) existingUser.setSkills(updatedProfile.getSkills());
        if (updatedProfile.getDomains() != null) existingUser.setDomains(updatedProfile.getDomains());
        if (updatedProfile.getExperienceLevel() != null) existingUser.setExperienceLevel(updatedProfile.getExperienceLevel());
        if (updatedProfile.getSkillScore() != null) existingUser.setSkillScore(updatedProfile.getSkillScore());
        
        return userRepository.save(existingUser);
    }

    public void deleteProfile(String id) {
        userRepository.deleteById(id);
    }
}
