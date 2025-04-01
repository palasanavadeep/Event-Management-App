package com.navadeep.event_management.controller;

import com.navadeep.event_management.dto.EventDTO;
import com.navadeep.event_management.model.Event;
import com.navadeep.event_management.model.EventCategory;
import com.navadeep.event_management.service.EventService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<EventDTO>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<EventDTO>> getEventsByCategory(@PathVariable EventCategory category) {
        return ResponseEntity.ok(eventService.getEventsByCategory(category));
    }
}
