package com.cim.backend.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cim.backend.model.Plan;
import com.cim.backend.service.PlanService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PlanController {
	
	@Autowired
	private PlanService planService;
	
	@GetMapping("/getallplans")
	public List<Plan> getAllPlans(){
		return planService.getAllPlans();
	}
	
	@GetMapping("/getUserPlan")
	public Plan getUserPlan(@RequestBody Plan plan) {
		return planService.getUserPlan(plan);
		
	}
	
	@GetMapping("/viewAllPlans")
	public List<Plan> viewAllplans(){
		return planService.viewAllPlans();
		
	}

}