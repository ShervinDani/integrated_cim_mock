package com.cim.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cim.backend.model.Customer;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long>{
	Optional<Customer> findByPhoneNumber(String phoneNumber);
	
	Customer findByEmail(String email);
	
	boolean existsByPhoneNumber(String phoneNumber);
	
	@Query("SELECT c.status, COUNT(c) FROM Customer c GROUP BY c.status")
	List<Object[]> findStatusCounts();
	
	List<Customer> findByActive(boolean active);

}