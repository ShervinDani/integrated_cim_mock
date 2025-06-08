package com.cim.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cim.backend.model.RetailCreation;

@Repository
public interface RetailerEntityRepository extends JpaRepository<RetailCreation, Long> {
}
