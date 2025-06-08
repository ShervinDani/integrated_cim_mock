package com.cim.backend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cim.backend.service.SecurityService;

@RestController
@RequestMapping("/api/security")
public class SecurityController {

    @Autowired
    private SecurityService securityService;

    @PostMapping("/2fa")
    public String enforceTwoFactorAuth(@RequestParam boolean enable) {
        securityService.setTwoFactorAuth(enable);
        return "Two-factor authentication " + (enable ? "enabled" : "disabled") + " successfully.";
    }

    @PostMapping("/password-policy")
    public String setPasswordPolicy(@RequestParam int minLength,
                                    @RequestParam boolean requireSpecialChars,
                                    @RequestParam boolean requireNumbers,
                                    @RequestParam boolean requireUppercase) {
        securityService.setPasswordPolicy(minLength, requireSpecialChars, requireNumbers, requireUppercase);
        return "Password policy updated.";
    }

    @PostMapping("/session-timeout")
    public String setSessionTimeout(@RequestParam int timeoutInMinutes) {
        securityService.setSessionTimeout(timeoutInMinutes);
        return "Session timeout set to " + timeoutInMinutes + " minutes.";
    }

    @PutMapping("/{id}/reset-password")
    public void resetPassword(@PathVariable Long id, @RequestParam String newPassword) {
        securityService.resetPassword(id, newPassword);
    }

//    @PutMapping("/{id}/role")
//    public User changeRole(@PathVariable Long id, @RequestParam Role role) {
//        return userService.changeRole(id, role);
//    }
}
