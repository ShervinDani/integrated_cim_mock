package com.cim.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cim.backend.model.RetailerRequest;

import java.util.List;

public interface RetailerRepository extends JpaRepository<RetailerRequest, Long> {
    List<RetailerRequest> findByStatus(String status);
}

