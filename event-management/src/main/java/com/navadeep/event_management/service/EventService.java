package com.navadeep.event_management.service;

import com.navadeep.event_management.dto.EventDTO;
import com.navadeep.event_management.mapper.DTOMapper;
import com.navadeep.event_management.model.Event;
import com.navadeep.event_management.model.EventCategory;
import com.navadeep.event_management.model.User;
import com.navadeep.event_management.model.UserRole;
import com.navadeep.event_management.repository.EventRepository;
import com.navadeep.event_management.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventService {
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventService(EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    // Create Event and return DTO
    public EventDTO createEvent(Event event, Long adminId) {
        if(event == null || adminId == null || adminId <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Event or adminId cannot be null or empty");
        }
        // Ensure only ADMIN users can create events
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Admin not found!"));

        if (admin.getRole() != UserRole.ADMIN) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Only ADMIN can create events!");
        }

        event.setCreatedBy(admin);
        Event savedEvent = eventRepository.save(event);

        return DTOMapper.convertToEventDTO(savedEvent);
    }

    

    public List<EventDTO> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream()
                .map(DTOMapper::convertToEventDTO)
                .collect(Collectors.toList());
    }


    // Get Events by Category as DTOs
    public List<EventDTO> getEventsByCategory(EventCategory category) {
        return eventRepository
                .findByCategory(category).stream()
                .map(DTOMapper::convertToEventDTO)
                .collect(Collectors.toList());
    }


}
