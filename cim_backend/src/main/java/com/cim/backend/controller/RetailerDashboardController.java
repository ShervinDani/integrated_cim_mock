package com.cim.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cim.backend.model.Customer;
import com.cim.backend.model.Plan;
import com.cim.backend.service.CustomerService;
import com.cim.backend.service.PlanService;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin(origins = "*")
public class RetailerDashboardController {

    @Autowired
    private PlanService planService;

    @Autowired
    private CustomerService customerService;

    @GetMapping("/plans")
    public List<Plan> getPlans(@RequestParam(required = false) String type) {
        List<Plan> plans = planService.getAllPlans();
        if (type != null) {
            return plans.stream()
                        .filter(plan -> type.equalsIgnoreCase(plan.getType()))
                        .collect(Collectors.toList());
        }
        return plans;
    }

    @GetMapping("/customers")
    public List<Customer> getCustomers(@RequestParam(required = false) String status) {
        List<Customer> customers = customerService.getAllCustomers();
        if (status != null) {
            return customers.stream()
                            .filter(c -> status.equalsIgnoreCase(c.getStatus()))
                            .collect(Collectors.toList());
        }
        return customers;
    }

    @GetMapping("/registrationstatus")
    public List<Object[]> getRegistrationStatusStats() {
        return customerService.getCustomerCountByStatus();
    }

   
}