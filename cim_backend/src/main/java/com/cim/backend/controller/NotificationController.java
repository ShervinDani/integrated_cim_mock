package com.cim.backend.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cim.backend.model.Notification;
import com.cim.backend.service.NotificationService;

@RestController
public class NotificationController {
	
	@Autowired
	NotificationService notificationService;
	
	@GetMapping("/notifications/{customerId}")
    public List<Notification> getNotifications(@PathVariable Long customerId) {
        return notificationService.getNotifications(customerId);
    }

}