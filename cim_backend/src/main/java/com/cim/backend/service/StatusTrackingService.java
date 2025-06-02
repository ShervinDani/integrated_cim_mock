package com.cim.backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cim.backend.repository.CustomerRepository;

@Service
public class StatusTrackingService {

    @Autowired
    private CustomerRepository customerRepository;

    public String getCustomerStatus(String phoneNumber) {
        return customerRepository.findByPhoneNumber(phoneNumber)
                .map(customer -> {
                    String status = customer.getStatus(); 
                    if ("active".equalsIgnoreCase(status)) {
                        return "Active";
                    } else if ("inactive".equalsIgnoreCase(status)) {
                        return "Inactive";
                    }
                    else if ("Pending".equalsIgnoreCase(status))
                    {
                    	return "Pending";
                    }
                    else if("Approved".equalsIgnoreCase(status))
                    {
                    	return "Approved";
                    }
                    else if("Rejected".equalsIgnoreCase(status))
                    {
                    	return "Rejected";
                    }
                    else {
                        return "Unknown Status";
                    }
                })
                .orElse("Customer does not exist");
    }
}