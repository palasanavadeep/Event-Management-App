package com.navadeep.event_management.repository;

import com.navadeep.event_management.model.Event;
import com.navadeep.event_management.model.EventRegistration;
import com.navadeep.event_management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface EventRegistrationRepository
        extends JpaRepository<EventRegistration, Long> {
    Optional<EventRegistration> findByUserAndEvent(User user, Event event); // Check if user registered
    List<EventRegistration> findByUser(User user); // Get all events a user registered for
}
