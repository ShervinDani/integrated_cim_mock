package com.cim.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cim.backend.model.Payment;
import com.cim.backend.service.PaymentService;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/users/submit")
    public Payment submitPayment(@RequestBody Map<String, Object> paymentPayload) {
        Long customerId = Long.valueOf(paymentPayload.get("customerId").toString());
        Long planId = Long.valueOf(paymentPayload.get("planId").toString());
        Double amount = Double.valueOf(paymentPayload.get("amount").toString());

        return paymentService.processPayment(customerId, planId, amount);
    }
}