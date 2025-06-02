package com.cim.backend.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cim.backend.model.Customer;
import com.cim.backend.model.Payment;
import com.cim.backend.model.Plan;
import com.cim.backend.repository.CustomerRepository;
import com.cim.backend.repository.PlanRepository;
import com.cim.backend.repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment processPayment(Long customerId, Long planId, Double amount) {
        Customer customer = customerRepository.findById(customerId)
            .orElseThrow(() -> new RuntimeException("Customer not found"));

        Plan plan = planRepository.findById(planId)
            .orElseThrow(() -> new RuntimeException("Plan not found"));

        Payment payment = new Payment();
        payment.setCustomer(customer);
        payment.setPlan(plan);
        payment.setAmount(amount);
        payment.setStatus("SUCCESS");
        payment.setPaymentDate(LocalDateTime.now());

        return paymentRepository.save(payment);
    }
}