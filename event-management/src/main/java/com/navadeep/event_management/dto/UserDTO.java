package com.navadeep.event_management.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
    private List<EventDTO> registeredEvents; // Include registered events
    private List<EventDTO> createdEvents; // Include created events
}
