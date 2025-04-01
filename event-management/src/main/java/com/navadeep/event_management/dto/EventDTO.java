package com.navadeep.event_management.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDateTime;


@Getter
@Setter
@Builder
public class EventDTO {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime date;
    private BigDecimal registrationFee;
    private int slots;
    private String venue;
    private String category;
    private String createdBy; // Send only the admin's name

}