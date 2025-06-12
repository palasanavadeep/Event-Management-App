package com.navadeep.event_management.controller;

import com.navadeep.event_management.model.AdminUpgradeRequest;
import com.navadeep.event_management.model.User;
import com.navadeep.event_management.model.UserRole;
import com.navadeep.event_management.repository.AdminUpgradeRequestRepository;
import com.navadeep.event_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/super-admin")
public class SuperAdminController {

    @Autowired
    private AdminUpgradeRequestRepository adminUpgradeRequestRepository;
    @Autowired
    private UserRepository userRepository;


    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @GetMapping("/upgrade-requests")
    public List<AdminUpgradeRequest> getPendingUpgradeRequests() {

        return adminUpgradeRequestRepository.findByStatus(AdminUpgradeRequest.RequestStatus.PENDING);
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @PostMapping("approve-request/{requestId}")
    public ResponseEntity<String> approveAdminUpgrade(@PathVariable Long requestId) {
        AdminUpgradeRequest request = adminUpgradeRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Request not found"));

        if (request.getStatus() != AdminUpgradeRequest.RequestStatus.PENDING) {
            return ResponseEntity.badRequest().body("Request already processed.");
        }

        User user = request.getUser();
        user.setRole(UserRole.ADMIN);
        userRepository.save(user);

        request.setStatus(AdminUpgradeRequest.RequestStatus.APPROVED);
        adminUpgradeRequestRepository.save(request);

        return ResponseEntity.ok("Admin role approved for user: " + user.getEmail());
    }

    @PreAuthorize("hasRole('SUPER_ADMIN')")
    @PostMapping("reject-request/{requestId}")
    public ResponseEntity<String> rejectAdminUpgrade(@PathVariable Long requestId) {
        AdminUpgradeRequest request = adminUpgradeRequestRepository.findById(requestId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Request not found"));

        if (request.getStatus() != AdminUpgradeRequest.RequestStatus.PENDING) {
            return ResponseEntity.badRequest().body("Request already processed.");
        }

        request.setStatus(AdminUpgradeRequest.RequestStatus.REJECTED);
        adminUpgradeRequestRepository.save(request);

        return ResponseEntity.ok("Admin upgrade request rejected.");
    }



}
