package com.navadeep.event_management.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class EventRegistrationDTO {
    private Long id;
    private String userName; // Send only username instead of full object
    private EventDTO event; // Send only event name instead of full object
    private LocalDateTime registrationDate;
    private boolean attended;
}
