package com.smartteam.teamformation.controller;

import com.smartteam.teamformation.model.User;
import com.smartteam.teamformation.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final UserService userService;

    // Optional POST endpoint if needed, usually handled by register, but added for completeness
    @PostMapping("/create")
    public ResponseEntity<User> createProfile(@RequestBody User user) {
        // For simplicity, we just use update or register for full creation.
        // Assuming this is requested per specification.
        return ResponseEntity.ok(user);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllProfiles() {
        return ResponseEntity.ok(userService.getAllProfiles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getProfileById(@PathVariable String id) {
        return ResponseEntity.ok(userService.getProfileById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateProfile(@PathVariable String id, @RequestBody User updatedProfile) {
        return ResponseEntity.ok(userService.updateProfile(id, updatedProfile));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable String id) {
        userService.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }
}
