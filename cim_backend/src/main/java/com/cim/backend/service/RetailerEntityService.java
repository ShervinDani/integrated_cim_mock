package com.cim.backend.service;

import org.springframework.stereotype.Service;

import com.cim.backend.model.RetailCreation;
import com.cim.backend.repository.RetailerEntityRepository;

import java.util.List;

@Service
public class RetailerEntityService {

    private final RetailerEntityRepository retailerRepository;

    public RetailerEntityService(RetailerEntityRepository retailerRepository) {
        this.retailerRepository = retailerRepository;
    }

    public List<RetailCreation> getAllRetailers() {
        return retailerRepository.findAll();
    }

    public RetailCreation getRetailerById(Long id) {
        return retailerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Retailer not found with id: " + id));
    }

    public RetailCreation createRetailer(RetailCreation retailer) {
        return retailerRepository.save(retailer);
    }

    public RetailCreation updateRetailer(Long id, RetailCreation updatedRetailer) {
        RetailCreation existing = getRetailerById(id);
        existing.setFirstName(updatedRetailer.getFirstName());
        existing.setLastName(updatedRetailer.getLastName());
        existing.setBusinessName(updatedRetailer.getBusinessName());
        existing.setRegistrationDate(updatedRetailer.getRegistrationDate());
        existing.setEmail(updatedRetailer.getEmail());
        existing.setAddress(updatedRetailer.getAddress());
        existing.setPhoneNumber(updatedRetailer.getPhoneNumber());
        existing.setStatus(updatedRetailer.getStatus());
        return retailerRepository.save(existing);
    }

    public void deleteRetailer(Long id) {
        retailerRepository.deleteById(id);
    }
}

