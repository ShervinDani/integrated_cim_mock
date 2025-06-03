package com.cim.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cim.backend.model.Customer;
import com.cim.backend.repository.CustomerRepository;



@Service
public class SecurityService {

    @Autowired
    private CustomerRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private boolean isTwoFactorAuthEnabled = false;
    private int minPasswordLength = 8;
    private boolean requireSpecialChars = true;
    private boolean requireNumbers = true;
    private boolean requireUppercase = true;
    private int sessionTimeout = 30; // in minutes

    public void setTwoFactorAuth(boolean enable) {
        this.isTwoFactorAuthEnabled = enable;
    }

    public void setPasswordPolicy(int minLength, boolean special, boolean numbers, boolean upper) {
        this.minPasswordLength = minLength;
        this.requireSpecialChars = special;
        this.requireNumbers = numbers;
        this.requireUppercase = upper;
    }

    public void setSessionTimeout(int minutes) {
        this.sessionTimeout = minutes;
    }

    public void resetPassword(Long userId, String newPassword) {
       Customer user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        // You should ideally hash the password before saving!
        user.setPassword(newPassword);
        userRepository.save(user);
    }

    // Optional: Get current security settings (useful for frontend)
    public String getPasswordPolicyDescription() {
        return "Min Length: " + minPasswordLength +
                ", Require Special: " + requireSpecialChars +
                ", Require Numbers: " + requireNumbers +
                ", Require Uppercase: " + requireUppercase;
    }
//    public User changeRole(Long userId, Role newRole) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        user.setRole(newRole);
//        return userRepository.save(user);
//    }

}
