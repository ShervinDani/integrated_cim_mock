package com.cim.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cim.backend.model.Customer;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{
	Optional<Customer> findByPhoneNumber(String phoneNumber);
	
	Customer findByEmail(String email);
	
	boolean existsByPhoneNumber(String phoneNumber);
	
	List<Customer> findByActive(boolean active);

}