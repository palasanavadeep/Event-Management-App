package com.navadeep.event_management.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private LocalDateTime date;

    @Column(nullable = false)
    private BigDecimal registrationFee;

    @Column(nullable = false)
    private int slots;

    @Column(nullable = false)
    private String venue;

    @Enumerated(EnumType.STRING)
    private EventCategory category;

    // Only ADMIN can create events
    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
//    @JsonBackReference
    private User createdBy;

    // List of users registered for this event
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonManagedReference
    private List<EventRegistration> registrations = new ArrayList<>();

    // Event image URL (Cloud Storage)
    @Column(name = "image_url")
    private String imageUrl;
}
