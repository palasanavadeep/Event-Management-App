package com.navadeep.event_management.service;

import com.navadeep.event_management.dto.UserDTO;
import com.navadeep.event_management.mapper.DTOMapper;
import com.navadeep.event_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;

import com.navadeep.event_management.model.User;
import org.springframework.web.server.ResponseStatusException;

import static com.navadeep.event_management.mapper.DTOMapper.convertToUserDTO;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Register User and return DTO
    public UserDTO registerUser(User user) {

        if(user.getEmail() == null || user.getEmail().isEmpty() ||
            user.getPassword() == null || user.getPassword().isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid email or password");
        }
        if(user.getPassword().length() < 8){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password must be at least 8 characters");
        }

        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT
                    ,"Email already registered!");
        }

        // Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
//        System.out.println("Saved user: " + savedUser);
        return DTOMapper.convertToUserDTO(savedUser);
    }

    public UserDTO getUserById(Long userId) {
        if(userId == null  || userId == 0){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid is Required !");
        }
        User user = userRepository
                .findById(userId)
                .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND,"User not found"));
        return convertToUserDTO(user);

    }

    public List<UserDTO> getAllUsers() {
        return userRepository
                .findAll().stream()
                .map(DTOMapper::convertToUserDTO)
                .collect(Collectors.toList());
    }




}
