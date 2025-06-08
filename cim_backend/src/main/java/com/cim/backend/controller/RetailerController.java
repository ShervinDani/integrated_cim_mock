package com.cim.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cim.backend.model.RetailerRequest;
import com.cim.backend.service.RetailerService;

@RestController
@RequestMapping("/api/requests")
public class RetailerController {

    @Autowired
    private RetailerService retailerService;

    @GetMapping("/pending")
    public List<RetailerRequest> getPendingRequests() {
        return retailerService.getPendingRequests();
    }

    @PostMapping("/{id}/approve")
    public void approve(@PathVariable Long id) {
        retailerService.approveRetailer(id);
    }

    @PostMapping("/{id}/reject")
    public void reject(@PathVariable Long id, @RequestBody String reason) {
        retailerService.rejectRetailer(id, reason);
    }
}