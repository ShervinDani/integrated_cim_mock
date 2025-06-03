package com.cim.backend.kafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.cim.backend.notification.NotificationEvent;

@Service
public class NotificationConsumer {

    @KafkaListener(topics = "retailer-notifications", groupId = "notification-group")
    public void consume(NotificationEvent event) {
        // Here you can send email or in-app notification
        System.out.println("Received notification: " + event.getEmail() + " - " + event.getSubject());
        // Call your NotificationService to send email, etc.
    }
}