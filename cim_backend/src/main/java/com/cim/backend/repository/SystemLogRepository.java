package com.cim.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cim.backend.model.SystemLog;

import java.util.List;

@Repository
public interface SystemLogRepository extends JpaRepository<SystemLog, Long> {
    List<SystemLog> findByUsername(String username);
    List<SystemLog> findByEventType(String eventType);
}

