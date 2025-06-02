package com.cim.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cim.backend.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}