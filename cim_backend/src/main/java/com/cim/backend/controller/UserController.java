package com.cim.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cim.backend.model.Users;
import com.cim.backend.service.UserService;

@CrossOrigin(origins="*")
@RestController
public class UserController {

    @Autowired
    private UserService service;


    @PostMapping("/register")
    public Users register(@RequestBody Users user) {
        return service.register(user);

    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user) {
    	System.out.println("Yo");
        String token = service.verify(user);
        System.out.println("Hi");
        if (token.equals("fail")) {
            Map<String, Object> error = new HashMap<>();
            System.out.println("Invalid");
            error.put("message", "Invalid credentials");
            return ResponseEntity.status(404).body(error);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        return ResponseEntity.ok(response); 
    }
    
    
}
