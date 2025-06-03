package com.cim.backend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.cim.backend.model.Notification;
import com.cim.backend.repository.NotificationRepository;


@Service
public class NotificationService {
	
	@Autowired
	NotificationRepository notificationRepository;
    @Autowired
    private JavaMailSender mailSender;


	public Notification getNotifications(Long id) {
        return notificationRepository.findByCustomerId(id);
    }
	

    public void sendRetailerStatusEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
        System.out.println("notification sent successfully");
    }
}
