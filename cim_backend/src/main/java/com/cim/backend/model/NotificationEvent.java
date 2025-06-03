package com.cim.backend.model;


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

    // Getter and Setter for email
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and Setter for subject
    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }

    // Getter and Setter for message
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}