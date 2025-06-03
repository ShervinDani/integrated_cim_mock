package com.cim.backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cim.backend.model.Invoice;
import com.cim.backend.repository.InvoiceRepository;

@Service
public class InvoiceService {
	@Autowired
	InvoiceRepository invoiceRepository;
	
	public Invoice getInvoices(Long id) {
        return invoiceRepository.findByCustomerId(id);
    }

}
