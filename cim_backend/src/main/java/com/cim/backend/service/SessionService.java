package com.cim.backend.service;


import com.cim.backend.model.Session;
import com.cim.backend.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    // Get all active sessions
    public List<Session> getActiveSessions() {
        return sessionRepository.findByActiveTrue();
    }

    // Terminate a session by session ID
    public boolean terminateSession(Long sessionId) {
        return sessionRepository.findById(sessionId).map(session -> {
            session.setActive(0);
            sessionRepository.save(session);
            return true;
        }).orElse(false);
    }

    // Terminate all sessions for a user
    public int terminateSessionsByUserId(Long userId) {
        List<Session> sessions = sessionRepository.findByUserIdAndActiveTrue(userId);
        sessions.forEach(session -> session.setActive(0));
        sessionRepository.saveAll(sessions);
        return sessions.size();
    }

    // Get all sessions
    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    // Create a new session
    public Session createSession(Session session) {
        return sessionRepository.save(session);
    }

    // Update a session
    public Session updateSession(Long sessionId, Session session) {
        Session existing = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        existing.setUserId(session.getUserId());
        existing.setUsername(session.getUsername());
        existing.setIpAddress(session.getIpAddress());
        existing.setLoginTime(session.getLoginTime());
        existing.setActive(session.getActive());

        // Add more fields if needed
        return sessionRepository.save(existing);
    }
}
