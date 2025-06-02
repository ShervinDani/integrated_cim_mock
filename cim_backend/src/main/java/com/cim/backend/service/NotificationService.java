package com.cim.backend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cim.backend.model.Notification;
import com.cim.backend.repository.NotificationRepository;

@Service
public class NotificationService {
	
	@Autowired
	NotificationRepository notificationRepository;
	

	public List<Notification> getNotifications(Long id) {
        return notificationRepository.findByCustomerId(id);
    }
}