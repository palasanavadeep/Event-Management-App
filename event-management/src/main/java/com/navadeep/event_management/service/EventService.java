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

    public EventDTO updateEvent(Long eventId, Event updatedEvent, Long adminId) {
        // Fetch event from DB
        Event existingEvent = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        // Fetch user and validate admin
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found"));

        if (admin.getRole() != UserRole.ADMIN) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only ADMIN can update events");
        }
        System.out.println(existingEvent);
        // Check if the event was created by this admin
        if (!existingEvent.getCreatedBy().getId().equals(adminId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only update events you created");
        }

        // Update editable fields only (image is NOT updated)
        existingEvent.setName(updatedEvent.getName());
        existingEvent.setDescription(updatedEvent.getDescription());
        existingEvent.setDate(updatedEvent.getDate());
        existingEvent.setVenue(updatedEvent.getVenue());
        existingEvent.setCategory(updatedEvent.getCategory());
        existingEvent.setRegistrationFee(updatedEvent.getRegistrationFee());
        existingEvent.setSlots(updatedEvent.getSlots());

        Event savedEvent = eventRepository.save(existingEvent);
        return DTOMapper.convertToEventDTO(savedEvent);
    }

    public void deleteEvent(Long eventId, Long adminId) {
        if (eventId == null || adminId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Event ID and Admin ID must be provided.");
        }

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found"));

        if (!admin.getRole().equals(UserRole.ADMIN)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only ADMIN users can delete events.");
        }

        if (!event.getCreatedBy().getId().equals(admin.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to delete this event.");
        }

        eventRepository.delete(event);
    }



    public List<EventDTO> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream()
                .map(DTOMapper::convertToEventDTO)
                .collect(Collectors.toList());
    }

    public EventDTO getEventById(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found"));

        return DTOMapper.convertToEventDTO(event);
    }



    // Get Events by Category as DTOs
    public List<EventDTO> getEventsByCategory(EventCategory category) {
        return eventRepository
                .findByCategory(category).stream()
                .map(DTOMapper::convertToEventDTO)
                .collect(Collectors.toList());
    }


    public List<EventDTO> getEventsCreatedByAdmin(Long adminId) {
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found"));

        if (!admin.getRole().equals(UserRole.ADMIN)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only ADMIN users can access this data.");
        }

        List<Event> events = eventRepository.findByCreatedBy(admin);
        return events.stream()
                .map(DTOMapper::convertToEventDTO)
                .collect(Collectors.toList());
    }

}
