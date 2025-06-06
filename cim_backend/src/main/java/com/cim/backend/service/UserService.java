package com.cim.backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cim.backend.model.Users;
import com.cim.backend.repository.UserRepo;

@Service
public class UserService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private UserRepo repo;


    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public Users register(Users user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
        return user;
    }

    public String verify(Users user) {
    	System.out.println("Users Verify");
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        
        if (authentication.isAuthenticated()) {
        	System.out.println("Hello");
            return jwtService.generateTokenFromUsername(user.getUsername());
        } else {
        	System.out.println("Hii");
            return "fail";
        }
    }
    
    public Users getUser(String username)
    {
    	Users user = repo.findByUsername(username);
    	if(user != null) {
    		return user;
    	}
    	else {
    		return null;
    	}
    }
}
