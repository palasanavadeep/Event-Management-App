package com.navadeep.event_management.controller;

import com.navadeep.event_management.dto.UserDTO;
import com.navadeep.event_management.model.User;
import com.navadeep.event_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        String token = userService.login(email, password);
        return Map.of("token", token);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody User user) {

        UserDTO newUser = userService.registerUser(user);
        return ResponseEntity.ok(newUser);
    }
}
