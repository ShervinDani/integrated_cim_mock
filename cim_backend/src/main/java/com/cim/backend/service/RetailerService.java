package com.cim.backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


import com.cim.backend.model.RetailerRequest;
import com.cim.backend.repository.RetailerRepository;

@Service
public class RetailerService {

    @Autowired
    private RetailerRepository retailerRepository;





    public List<RetailerRequest> getPendingRequests() {
        return retailerRepository.findByStatus("PENDING");
    }

    public Optional<RetailerRequest> getRetailerById(Long id) {
        return retailerRepository.findById(id);
    }

    public RetailerRequest approveRetailer(Long id) {
        RetailerRequest retailer = retailerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));
        retailer.setStatus("APPROVED");
        return retailerRepository.save(retailer);
    }

    public RetailerRequest rejectRetailer(Long id, String reason) {
        RetailerRequest retailer = retailerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Retailer not found"));
        retailer.setStatus("REJECTED");
        retailer.setRejectionReason(reason);
        return retailerRepository.save(retailer);
    }

    public RetailerRequest createRetailerRequest(RetailerRequest request) {
        request.setCreatedAt(LocalDateTime.now());
        return retailerRepository.save(request);
    }

    public List<RetailerRequest> getAllRetailers() {
        return retailerRepository.findAll();
    }

    public RetailerRequest updateRetailer(Long id, RetailerRequest request) {
        RetailerRequest existing = retailerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Retailer not found"));
        // Update fields as needed
        existing.setStatus(request.getStatus());
        existing.setRejectionReason(request.getRejectionReason());

        // Add more fields if needed
        return retailerRepository.save(existing);
    }

    public void deleteRetailer(Long id) {
        retailerRepository.deleteById(id);
    }
}

