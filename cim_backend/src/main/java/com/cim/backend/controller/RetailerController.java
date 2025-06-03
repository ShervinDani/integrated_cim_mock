package com.cim.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cim.backend.model.RetailerRequest;
import com.cim.backend.service.RetailerService;

import java.util.List;

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