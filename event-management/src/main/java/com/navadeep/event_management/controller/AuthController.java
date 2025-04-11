package com.navadeep.event_management.controller;

import com.navadeep.event_management.dto.UserDTO;
import com.navadeep.event_management.model.User;
import com.navadeep.event_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        String token = userService.login(email, password);
        Map<String, String> response = new HashMap<>();
        UserDTO user = userService.getUserByEmail(email);
        response.put("token", token);
        response.put("email", email);
        response.put("username", user.getName());
        response.put("role" ,user.getRole());
        response.put("id" , user.getId().toString() );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody User user) {

        UserDTO newUser = userService.registerUser(user);
        return ResponseEntity.ok(newUser);
    }
}
