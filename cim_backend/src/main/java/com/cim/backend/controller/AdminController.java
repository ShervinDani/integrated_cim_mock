package com.cim.backend.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cim.backend.model.Customer;
import com.cim.backend.model.RetailerRequest;
import com.cim.backend.model.Session;
import com.cim.backend.model.SystemLog;
import com.cim.backend.model.RetailerRequest;
import com.cim.backend.service.AdminService;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Comparator;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    AdminService adminService;

    @GetMapping("/users")
    public List<Customer> getAllUsers() {
        return adminService.getAllUsers();
    }



    @GetMapping("/users/role")
    public List<Customer> getUsersByRole() {
        return adminService.getUsersByRole();
    }

    @GetMapping("/users/status")
    public List<Customer> getUsersByStatus(@RequestParam boolean active) {
        return adminService.getUsersByStatus(active);
    }

//    // Change user role
//    @PutMapping("/{id}/role")
//    public Customer changeRole(@PathVariable Long id, @RequestParam Role role) {
//        return adminService.changeRole(id, role);
//    }

    // Toggle user active status
    @PutMapping("/{id}/status")
    public void toggleStatus(@PathVariable Long id, @RequestParam boolean active) {
        adminService.toggleUserStatus(id, active);
    }

    @GetMapping("/retailer-requests")
    public List<RetailerRequest> getAllRetailerRequests() {
        return adminService.getAllRetailerRequests();
    }

    @GetMapping("/retailer-requests/log")
    public List<RetailerRequest> getRetailerRequestsLog() {
        List<RetailerRequest> requests = adminService.getAllRetailerRequests();
        requests.sort(Comparator.comparing(r -> r.getCreatedAt() == null ? 0 : r.getCreatedAt().toEpochSecond(java.time.ZoneOffset.UTC)));
        return requests;
    }

    @GetMapping("/retailer-requests/{id}")
    public ResponseEntity<RetailerRequest> getRetailerRequestById(@PathVariable Long id) {
        return adminService.getRetailerRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/documents/{filename:.+}")
    public ResponseEntity<Resource> getDocument(@PathVariable String filename) {
        try {
            Path file = Paths.get("uploads").resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }


    // Reset user password
    @PutMapping("/{id}/reset-password")
    public void resetPassword(@PathVariable Long id, @RequestParam String newPassword) {
        adminService.resetPassword(id, newPassword);

    }

    @PostMapping("/retailer/{id}/review")
    public ResponseEntity<?> reviewRetailerRequest(
            @PathVariable Long id,
            @RequestParam boolean approve,
            @RequestParam(required = false) String rejectionReason) {
        adminService.reviewRetailerRequest(id, approve, rejectionReason);
        return ResponseEntity.ok("Review completed");
    }

    @PostMapping("/retailer/{id}/approve")
    public ResponseEntity<RetailerRequest> approveRetailer(@PathVariable Long id) {
        RetailerRequest updated = adminService.approveRetailer(id);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/retailer/{id}/reject")
    public ResponseEntity<RetailerRequest> rejectRetailer(@PathVariable Long id, @RequestParam String reason) {
        RetailerRequest updated = adminService.rejectRetailer(id, reason);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/sessions")
    public List<Session> getAllSessions() {
        return adminService.getAllSessions();
    }

    @GetMapping("/sessions/user/{userId}")
    public List<Session> getSessionsByUserId(@PathVariable Long userId) {
        return adminService.getSessionsByUserId(userId);
    }

    @GetMapping("/system-logs")
    public List<SystemLog> getAllSystemLogs() {
        return adminService.getAllSystemLogs();
    }

} 