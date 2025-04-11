package com.navadeep.event_management.mapper;

import com.navadeep.event_management.dto.EventDTO;
import com.navadeep.event_management.dto.EventRegistrationDTO;
import com.navadeep.event_management.dto.UserDTO;
import com.navadeep.event_management.model.Event;
import com.navadeep.event_management.model.EventRegistration;
import com.navadeep.event_management.model.User;

import java.util.List;
import java.util.stream.Collectors;
public class DTOMapper {

    public static EventRegistrationDTO convertToEventRegistrationDTO(EventRegistration registration) {
        EventRegistrationDTO dto = new EventRegistrationDTO();
        dto.setId(registration.getId());
        dto.setUserName(registration.getUser().getName()); // Extracting username
        dto.setEvent(convertToEventDTO(registration.getEvent())); // Extracting event name
        dto.setRegistrationDate(registration.getRegistrationDate());
        dto.setAttended(registration.isAttended());
        return dto;
    }

//    public static UserDTO convertToUserDTO(User user) {
//        UserDTO dto = new UserDTO();
//        dto.setId(user.getId());
//        dto.setName(user.getName());
//        dto.setEmail(user.getEmail());
//        dto.setPhone(user.getPhone());
//        dto.setRole(user.getRole().name());
//
//        dto.setRegisteredEvents(
//                user.getEventRegistrations()
//                        .stream()
//                        .map(reg -> convertToEventDTO(reg.getEvent()))
//                        .collect(Collectors.toList())
//        );
//
//        dto.setCreatedEvents(
//                user.getCreatedEvents()
//                        .stream()
//                        .map(DTOMapper::convertToEventDTO)
//                        .collect(Collectors.toList())
//        );
//
//        return dto;
//    }
//
//    public static EventDTO convertToEventDTO(Event event) {
//        EventDTO dto = new EventDTO();
//        dto.setId(event.getId());
//        dto.setName(event.getName());
//        dto.setDescription(event.getDescription());
//        dto.setDate(event.getDate());
//        dto.setRegistrationFee(event.getRegistrationFee());
//        dto.setSlots(event.getSlots());
//        dto.setVenue(event.getVenue());
//        dto.setCategory(event.getCategory().name());
//        dto.setCreatedBy(String.valueOf(convertToUserDTO(event.getCreatedBy()))); // Convert CreatedBy to DTO
//        return dto;
//    }
public static UserDTO convertToUserDTO(User user) {
    // Convert List<Event> to List<EventDTO> by mapping each Event to EventDTO
    List<EventDTO> createdEventDTOs = user.getCreatedEvents().stream()
            .map(DTOMapper::convertToEventDTO) // Assuming you have a convertToEventDTO method
            .collect(Collectors.toList());

    List<EventDTO> recommendedEventDTOs = user.getRecommendedEvents().stream()
            .map(DTOMapper::convertToEventDTO) // Again, map each Event to EventDTO
            .collect(Collectors.toList());

    return UserDTO.builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .phone(user.getPhone())
            .role(String.valueOf(user.getRole()))
            .createdEvents(createdEventDTOs)
            .registeredEvents(recommendedEventDTOs)
            .build();
}

    public static EventDTO convertToEventDTO(Event event) {
        return EventDTO.builder()
                .id(event.getId())
                .name(event.getName())
                .description(event.getDescription())
                .date(event.getDate())
                .registrationFee(event.getRegistrationFee())
                .slots(event.getSlots())
                .venue(event.getVenue())
                .category(String.valueOf(event.getCategory()))
                .createdBy(String.valueOf(event.getCreatedBy().getId())) // Assuming 'createdBy' is a User entity
                .image(event.getImageUrl())
                .build();
    }


}
