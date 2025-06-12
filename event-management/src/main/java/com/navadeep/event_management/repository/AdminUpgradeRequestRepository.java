package com.navadeep.event_management.repository;

import com.navadeep.event_management.model.AdminUpgradeRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminUpgradeRequestRepository extends JpaRepository<AdminUpgradeRequest, Long> {
    List<AdminUpgradeRequest> findByStatus(AdminUpgradeRequest.RequestStatus status);
}
