package com.cim.backend.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.cim.backend.model.Invoice;
import com.cim.backend.service.InvoiceService;

@RestController
public class InvoiceController {
	
	@Autowired
	InvoiceService invoiceService;
	
	@GetMapping("/invoices/{customerId}")
    public Invoice getInvoices(@PathVariable Long customerId) {
        return invoiceService.getInvoices(customerId);
    }

}