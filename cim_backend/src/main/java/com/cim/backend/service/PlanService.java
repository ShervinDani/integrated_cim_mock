package com.cim.backend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cim.backend.exception.EntityNotFoundException;
import com.cim.backend.model.Plan;
import com.cim.backend.repository.PlanRepository;

@Service
public class PlanService {
	
	@Autowired
	private PlanRepository planRepository;
	
	public List<Plan> getAllPlans() {
		return planRepository.findAll();
	}
	
	public Plan getUserPlan(Plan plan) {
		return planRepository.findById(plan.getId()).orElseThrow(() -> new EntityNotFoundException("Plan Not found of Id "+ plan.getId()));
	}

	public List<Plan> viewAllPlans() {
		
		return planRepository.findAll();
	}

}