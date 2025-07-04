package com.navadeep.event_management.controller;


import com.navadeep.event_management.dto.EventDTO;
import com.navadeep.event_management.dto.UserDTO;
import com.navadeep.event_management.model.User;
import com.navadeep.event_management.service.UserService;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }



    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }


    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }


    @PostMapping("/request-admin/{userId}")
    public ResponseEntity<String> requestAdminUpgrade(@PathVariable Long userId) {
//        System.out.println(userId);
//        System.out.println("test");
        String message = userService.handleAdminUpgradeRequest(userId);
        System.out.println("finish");
        return ResponseEntity.ok(message);
    }

}
