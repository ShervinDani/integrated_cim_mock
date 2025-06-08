package com.cim.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cim.backend.config.SecurityConfig;
import com.cim.backend.model.Customer;
import com.cim.backend.model.OtpRequest;
import com.cim.backend.service.CustomerService;
import com.cim.backend.service.OtpService;

import java.util.Map;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class OtpController {

    private final OtpService otpService;
    private final SecurityConfig securityConfig;

	@Autowired
	private CustomerService customerService;
	
    @Autowired
    public OtpController(OtpService otpService, SecurityConfig securityConfig) {
        this.otpService = otpService;
        this.securityConfig = securityConfig;
    }

    @PostMapping("/send-otp")
    public ResponseEntity<Map<String, String>> sendOtp(@RequestBody OtpRequest request) {
    	Customer customer = customerService.getByEmail(request.getEmail());
        if(customer != null) {
    	otpService.sendOtp(customer.getEmail());
        System.out.println("✅ OTP sent to: " + request.getEmail());
        return ResponseEntity.ok(Map.of("message", "OTP sent successfully"));
        }
        else {
        	return  ResponseEntity.ok(Map.of("message", "Customer not found"));
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<Map<String, String>> verifyOtp(@RequestBody OtpRequest request) {
        String token = otpService.verifyOtp(request.getEmail(), request.getOtp());
        if (token != null) {
            return ResponseEntity.ok(Map.of(
            		"message", "OTP verified",
            		"token",token));
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid OTP"));
        }
    }
}
