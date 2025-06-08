package com.cim.backend.kafka;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.cim.backend.notification.NotificationEvent;

@Service
public class NotificationProducer {

    private static final String TOPIC = "retailer-notifications";

    @Autowired
    private KafkaTemplate<String, NotificationEvent> kafkaTemplate;

    public String sendNotification(NotificationEvent event) {

        kafkaTemplate.send(TOPIC, event);
        return "Notification sent successfully";
    }
}