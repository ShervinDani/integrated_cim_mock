package com.cim.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cim.backend.service.StatusTrackingService;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class StatusController {
	
	@Autowired
	private StatusTrackingService statusService;
	@GetMapping("/trackStatus")
	public String trackStatus(@RequestParam String phoneNumber) {
	    System.out.println("Phone number requested: " + phoneNumber);
	    String status = statusService.getCustomerStatus(phoneNumber);
	    System.out.println("Status found: " + status);
	    return status;
	}
 
}