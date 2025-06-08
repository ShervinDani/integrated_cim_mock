package com.cim.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cim.backend.model.Invoice;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long>{
	public Invoice findByCustomerId(long id);
	
}
