package com.navadeep.event_management.controller;

import com.navadeep.event_management.dto.EventRegistrationDTO;
import com.navadeep.event_management.model.EventRegistration;
import com.navadeep.event_management.service.EventRegistrationService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

@RestController
@RequestMapping("/api/registrations")
public class EventRegistrationController {
    private final EventRegistrationService eventRegistrationService;

    public EventRegistrationController(EventRegistrationService eventRegistrationService) {
        this.eventRegistrationService = eventRegistrationService;
    }

    @PostMapping("/{userId}/event/{eventId}")
    public ResponseEntity<EventRegistrationDTO> registerForEvent(@PathVariable Long userId, @PathVariable Long eventId) {
        EventRegistrationDTO registration = eventRegistrationService.registerUserForEvent(userId, eventId);
        return ResponseEntity.ok(registration);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<EventRegistrationDTO>> getUserRegistrations(@PathVariable Long userId) {
        return ResponseEntity.ok(eventRegistrationService.getUserRegistrations(userId));
    }

}
