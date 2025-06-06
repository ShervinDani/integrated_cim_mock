package com.cim.backend.notification;


import java.io.Serializable;

public class NotificationEvent implements Serializable {
    private String email;
    private String subject;
    private String message;

    public NotificationEvent() {}

    public NotificationEvent(String email, String subject, String message) {
        this.email = email;
        this.subject = subject;
        this.message = message;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
} 