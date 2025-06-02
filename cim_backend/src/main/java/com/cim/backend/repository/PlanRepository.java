package com.cim.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cim.backend.model.Plan;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {

}