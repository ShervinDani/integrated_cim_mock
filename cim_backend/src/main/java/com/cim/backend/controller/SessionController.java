package com.cim.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cim.backend.model.Session;
import com.cim.backend.service.SessionService;

import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    // View active sessions
    @GetMapping("/active")
    public List<Session> getActiveSessions() {
        return sessionService.getActiveSessions();
    }

    // Terminate a user session by session ID
    @DeleteMapping("/{sessionId}")
    public String terminateSession(@PathVariable Long sessionId) {
        boolean result = sessionService.terminateSession(sessionId);
        return result ? "Session terminated successfully." : "Session not found.";
    }

    // Terminate sessions by user ID (in case of suspicious activity)
    @DeleteMapping("/user/{userId}")
    public String terminateUserSessions(@PathVariable Long userId) {
        int count = sessionService.terminateSessionsByUserId(userId);
        return count + " session(s) terminated for user ID: " + userId;
    }

    // Get all sessions
    @GetMapping
    public List<Session> getAllSessions() {
        return sessionService.getAllSessions();
    }

    // Create a new session
    @PostMapping
    public Session createSession(@RequestBody Session session) {
        return sessionService.createSession(session);
    }

    // Update a session
    @PutMapping("/{sessionId}")
    public Session updateSession(@PathVariable Long sessionId, @RequestBody Session session) {
        return sessionService.updateSession(sessionId, session);
    }
}

