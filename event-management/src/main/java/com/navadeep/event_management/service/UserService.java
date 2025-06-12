package com.navadeep.event_management.service;

import com.navadeep.event_management.dto.UserDTO;
import com.navadeep.event_management.mapper.DTOMapper;
import com.navadeep.event_management.model.AdminUpgradeRequest;
import com.navadeep.event_management.repository.AdminUpgradeRequestRepository;
import com.navadeep.event_management.repository.UserRepository;
import com.navadeep.event_management.utility.JwtUtil;
import jakarta.transaction.Transactional;
import jdk.swing.interop.SwingInterOpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;
import java.util.stream.Collectors;
import com.navadeep.event_management.model.UserRole;
import com.navadeep.event_management.model.User;
import org.springframework.web.server.ResponseStatusException;

import static com.navadeep.event_management.mapper.DTOMapper.convertToUserDTO;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private  final AdminUpgradeRequestRepository adminUpgradeRequestRepository;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AdminUpgradeRequestRepository adminUpgradeRequestRepository, AdminUpgradeRequestRepository adminUpgradeRequestRepository1) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminUpgradeRequestRepository = adminUpgradeRequestRepository1;
    }

    @Autowired
    private JwtUtil jwtUtil;

    public String login(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty() || !passwordEncoder.matches(password, userOptional.get().getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        return jwtUtil.generateToken(email);
    }

    // Register User and return DTO
    public UserDTO registerUser(User user) {
        System.out.println("test");
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
        user.setRole(UserRole.USER);
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
    public UserDTO getUserByEmail(String email) {
        if(email == null  || email.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid is Required !");
        }
        User user = userRepository
                .findByEmail(email.trim())
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

    public String handleAdminUpgradeRequest(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        if (user.getRole() != UserRole.USER) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only USERs can request admin upgrade.");
        }

        System.out.println("test");

        boolean alreadyRequested = adminUpgradeRequestRepository
                .findByStatus(AdminUpgradeRequest.RequestStatus.PENDING).stream()
                .anyMatch(r -> r.getUser().getId().equals(userId));

        if (alreadyRequested) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Upgrade request is already pending.");
        }

        AdminUpgradeRequest request = new  AdminUpgradeRequest();
        request.setUser(user);
        request.setRequestDate(LocalDateTime.now());
        request.setStatus(AdminUpgradeRequest.RequestStatus.PENDING);

        adminUpgradeRequestRepository.save(request);

        return "Admin upgrade request submitted.";
    }
}
