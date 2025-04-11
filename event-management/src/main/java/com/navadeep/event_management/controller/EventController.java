package com.navadeep.event_management.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.navadeep.event_management.cloud.ImageUploadService;
import com.navadeep.event_management.dto.EventDTO;
import com.navadeep.event_management.model.Event;
import com.navadeep.event_management.model.EventCategory;
import com.navadeep.event_management.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping("/create/{adminId}")
    public ResponseEntity<EventDTO> createEvent(@RequestBody Event event, @PathVariable Long adminId) {
        EventDTO newEvent = eventService.createEvent(event, adminId);
        return ResponseEntity.ok(newEvent);
    }

    @PutMapping("/update/{eventId}/{adminId}")
    public ResponseEntity<EventDTO> updateEvent(
            @PathVariable Long eventId,
            @PathVariable Long adminId,
            @RequestBody Event updatedEvent) {

        EventDTO updated = eventService.updateEvent(eventId, updatedEvent, adminId);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<EventDTO> getEventById(@PathVariable Long eventId) {
        EventDTO event = eventService.getEventById(eventId);
        return ResponseEntity.ok(event);
    }

    @DeleteMapping("/delete/{eventId}/admin/{adminId}")
    public ResponseEntity<String> deleteEvent(
            @PathVariable Long eventId,
            @PathVariable Long adminId) {

        eventService.deleteEvent(eventId, adminId);
        return ResponseEntity.ok("Event deleted successfully.");
    }

    @GetMapping("/admin/{adminId}/events")
    public ResponseEntity<List<EventDTO>> getAllEventsCreatedByAdmin(@PathVariable Long adminId) {
        List<EventDTO> events = eventService.getEventsCreatedByAdmin(adminId);
        return ResponseEntity.ok(events);
    }



    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<EventDTO>> getEventsByCategory(@PathVariable EventCategory category) {
        return ResponseEntity.ok(eventService.getEventsByCategory(category));
    }
}
