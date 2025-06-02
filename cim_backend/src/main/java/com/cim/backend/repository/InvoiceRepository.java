package com.cim.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cim.backend.model.Invoice;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long>{
	public List<Invoice> findByUserId(long id);
}