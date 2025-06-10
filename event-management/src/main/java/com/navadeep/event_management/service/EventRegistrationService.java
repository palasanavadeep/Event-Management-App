package com.navadeep.event_management.service;

import com.navadeep.event_management.dto.EventRegistrationDTO;
import com.navadeep.event_management.model.Event;
import com.navadeep.event_management.model.EventRegistration;
import com.navadeep.event_management.model.User;
import com.navadeep.event_management.repository.EventRegistrationRepository;
import com.navadeep.event_management.repository.EventRepository;
import com.navadeep.event_management.repository.UserRepository;
import com.navadeep.event_management.mapper.DTOMapper;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Transactional
@Service
public class EventRegistrationService {

    private final EventRegistrationRepository eventRegistrationRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public EventRegistrationService(EventRegistrationRepository eventRegistrationRepository,
                                    UserRepository userRepository,
                                    EventRepository eventRepository) {
        this.eventRegistrationRepository = eventRegistrationRepository;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

//    public EventRegistrationDTO registerUserForEvent(Long userId, Long eventId) {
//        if(userId == null || eventId == null) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
//                    "Invalid user id :"+userId+" or event id "+eventId);
//        }
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"User not found!"));
//        Event event = eventRepository.findById(eventId)
//                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"Event not found!"));
//
//        // Check if already registered
//        Optional<EventRegistration> existingRegistration = eventRegistrationRepository.findByUserAndEvent(user, event);
//        if (existingRegistration.isPresent()) {
//            throw new ResponseStatusException(HttpStatus.CONFLICT,"User already registered for this event!");
//        }
//
//        // Register user
//        EventRegistration registration = new EventRegistration();
//        registration.setUser(user);
//        registration.setEvent(event);
//        registration.setRegistrationDate(LocalDateTime.now());
//
//        EventRegistration savedRegistration = eventRegistrationRepository.save(registration);
//
//        return DTOMapper.convertToEventRegistrationDTO(savedRegistration);
//    }

public EventRegistrationDTO registerUserForEvent(Long userId, Long eventId) {
    if (userId == null || eventId == null) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                "Invalid user id: " + userId + " or event id: " + eventId);
    }

    User user = userRepository.findById(userId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!"));

    Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Event not found!"));

    // Check if already registered
    Optional<EventRegistration> existingRegistration = eventRegistrationRepository.findByUserAndEvent(user, event);
    if (existingRegistration.isPresent()) {
        throw new ResponseStatusException(HttpStatus.CONFLICT, "User already registered for this event!");
    }

    // Check available slots
    if (event.getSlots() <= 0) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No available slots for this event.");
    }

    // Reduce available slots
    event.setSlots(event.getSlots() - 1);
    eventRepository.save(event); // persist the change

    // Register user
    EventRegistration registration = new EventRegistration();
    registration.setUser(user);
    registration.setEvent(event);
    registration.setRegistrationDate(LocalDateTime.now());

    EventRegistration savedRegistration = eventRegistrationRepository.save(registration);

    return DTOMapper.convertToEventRegistrationDTO(savedRegistration);
}


    public List<EventRegistrationDTO> getUserRegistrations(Long userId) {
        if(userId == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Invalid user Id ");
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,"User not found!"));

        return eventRegistrationRepository.findByUser(user)
                .stream()
                .map(DTOMapper::convertToEventRegistrationDTO)
                .collect(Collectors.toList());
    }

}
