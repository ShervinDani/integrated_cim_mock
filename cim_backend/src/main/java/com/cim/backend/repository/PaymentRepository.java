package com.cim.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cim.backend.model.Payment;
import com.cim.backend.model.Plan;

import java.util.List;
import com.cim.backend.model.Customer;



public interface PaymentRepository extends JpaRepository<Payment, Long> {
	
	Payment findByCustomer(Customer customer);
	
}