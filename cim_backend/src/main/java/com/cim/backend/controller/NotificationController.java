package com.cim.backend.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cim.backend.model.Notification;
import com.cim.backend.service.NotificationService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class NotificationController {
	
	@Autowired
	NotificationService notificationService;
	
	@GetMapping("/notifications/{customerId}")
    public Notification getNotifications(@PathVariable Long customerId) {
        return notificationService.getNotifications(customerId);
    }

    // Endpoint to send a test notification email
    @PostMapping("/api/notifications/send-email")
    public String sendTestEmail(@RequestParam String to,
                                @RequestParam String subject,
                                @RequestParam String message) {
        notificationService.sendRetailerStatusEmail(to, subject, message);
        return "Notification email sent to " + to;
    }

}