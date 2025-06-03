package com.cim.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cim.backend.model.RetailCreation;
import com.cim.backend.service.RetailerEntityService;

import java.util.List;

@RestController
@RequestMapping("/api/retailers")
public class RetailerEntityController {

    private final RetailerEntityService retailerService;

    @Autowired
    public RetailerEntityController(RetailerEntityService retailerService) {
        this.retailerService = retailerService;
    }

    @GetMapping
    public List<RetailCreation> getAllRetailers() {
        return retailerService.getAllRetailers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<RetailCreation> getRetailerById(@PathVariable Long id) {
        return ResponseEntity.ok(retailerService.getRetailerById(id));
    }

    @PostMapping
    public ResponseEntity<RetailCreation> createRetailer(@RequestBody RetailCreation retailer) {
        return ResponseEntity.ok(retailerService.createRetailer(retailer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RetailCreation> updateRetailer(@PathVariable Long id, @RequestBody RetailCreation retailer) {
        return ResponseEntity.ok(retailerService.updateRetailer(id, retailer));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRetailer(@PathVariable Long id) {
        retailerService.deleteRetailer(id);
        return ResponseEntity.noContent().build();
    }
}
