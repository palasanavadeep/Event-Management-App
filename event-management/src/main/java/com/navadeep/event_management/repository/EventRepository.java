package com.navadeep.event_management.repository;

import com.navadeep.event_management.model.Event;
import com.navadeep.event_management.model.EventCategory;
import com.navadeep.event_management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByCategory(EventCategory category); // Find events by category
    List<Event> findByCreatedBy(User createdBy); // Find events created by a specific user
}
