package com.cim.backend.service;
import com.cim.backend.kafka.NotificationProducer;
import com.cim.backend.model.Customer;
import com.cim.backend.model.RetailerRequest;
import com.cim.backend.model.Session;
import com.cim.backend.model.SystemLog;
import com.cim.backend.repository.CustomerRepository;
import com.cim.backend.repository.RetailerRepository;
import com.cim.backend.repository.SessionRepository;
import com.cim.backend.repository.SystemLogRepository;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final CustomerRepository customerRepository;
    @Autowired
    private CustomerRepository userRepository;
    @Autowired
    private RetailerRepository retailerRepository;
    @Autowired
    private NotificationService notificationService;
    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    private SystemLogRepository systemLogRepository;

    @Autowired
    private NotificationProducer notificationProducer;

    AdminService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> getAllUsers() {
        return userRepository.findAll();
    }

//    public Customer changeRole(Long userId, Role newRole) {
//        Customer user = userRepository.findById(userId).orElseThrow();
//        user.setRole(newRole);
//        System.out.println("Role changed successfully..");
//        return userRepository.save(user);
//    }

    public void toggleUserStatus(Long userId, boolean isActive) {
        Customer user = userRepository.findById(userId).orElseThrow();
        user.setActive(isActive);
        userRepository.save(user);
        System.out.println("status updated successfully.." + isActive);
    }

    public List<RetailerRequest> getAllRetailerRequests() {
        return retailerRepository.findAll();
    }

    public void resetPassword(Long userId, String newPassword) {
        Customer user = userRepository.findById(userId).orElseThrow();
        user.setPassword(newPassword);
        System.out.println("password reset successfully..");// In production, hash the password!
        userRepository.save(user);
    }

    public RetailerRequest approveRetailer(Long id) {
        RetailerRequest retailer = retailerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));
        retailer.setStatus("APPROVED");
        retailerRepository.save(retailer);

        // Send notification
        if (retailer.getUser() != null && retailer.getUser().getEmail() != null) {
            notificationService.sendRetailerStatusEmail(
                retailer.getUser().getEmail(),
                "Your Retailer Registration is Approved",
                "Congratulations! Your retailer registration has been approved."
            );
        }
        return retailer;
    }

    public RetailerRequest rejectRetailer(Long id, String reason) {
        RetailerRequest retailer = retailerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));
        retailer.setStatus("REJECTED");
        retailer.setRejectionReason(reason);
        retailerRepository.save(retailer);

        // Send notification
        if (retailer.getUser() != null && retailer.getUser().getEmail() != null) {
            notificationService.sendRetailerStatusEmail(
                retailer.getUser().getEmail(),
                "Your Retailer Registration is Rejected",
                "Sorry, your retailer registration was rejected. Reason: " + reason
            );
        }
        return retailer;
    }

    public void reviewRetailerRequest(Long id, boolean approve, String rejectionReason) {
        // Find the retailer request by id
        RetailerRequest request = retailerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Retailer request not found with id: " + id));

        if (approve) {
            // Approve the request
            request.setStatus("APPROVED");
            request.setRejectionReason(null); // clear rejection reason if any
        } else {
            // Reject the request, set rejection reason
            request.setStatus("REJECTED");
            request.setRejectionReason(rejectionReason);
        }

        // Save the updated request
        retailerRepository.save(request);
    }

    public List<Customer> getUsersByRole() {
        return userRepository.findAll();
    }

    public List<Customer> getUsersByStatus(boolean active) {
        return userRepository.findByActive(active);
    }

    public List<Session> getAllSessions() {
        return sessionRepository.findAll();
    }

    public List<Session> getSessionsByUserId(Long userId) {
        return sessionRepository.findByUserId(userId);
    }

    public List<SystemLog> getAllSystemLogs() {
        return systemLogRepository.findAll();
    }

    public java.util.Optional<RetailerRequest> getRetailerRequestById(Long id) {
        return retailerRepository.findById(id);
    }
}

