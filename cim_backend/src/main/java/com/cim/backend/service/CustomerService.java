package com.cim.backend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cim.backend.exception.EntityNotFoundException;
import com.cim.backend.model.Customer;
import com.cim.backend.model.Document;
import com.cim.backend.repository.CustomerRepository;
import com.cim.backend.repository.DocumentRepository;
import com.cim.backend.repository.NumberRepository;
import com.cim.backend.model.Number;

@Service
public class CustomerService {
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private DocumentRepository documentRepository;
	
	@Autowired
	private NumberRepository numberRepository;

	public Customer registerCustomer(Customer newCustomer) {
		if(newCustomer.getPhoneNumber() != null)
		{
			Number number = numberRepository.findByPhoneNumber(Long.parseLong(newCustomer.getPhoneNumber()));
			number.setStatus(1);
			numberRepository.save(number);
		}
		return customerRepository.save(newCustomer);
	}
	public Customer getCustomerDetails(Long id) {
		return customerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Customer Not found of Id "+ id));
	}

	public String updateCustomer(Customer customer) {
		Customer customer1 = customerRepository.findById(customer.getCustomerId()).orElseThrow(() -> new EntityNotFoundException("Customer Not found of Id "+ customer.getCustomerId()));
		
		
		if(customer != null) {
			
			customer1.setEmail(customer.getEmail());
			customer1.setAddress(customer.getAddress());
			
			
		}
		
		customerRepository.save(customer1);
		
		return "Customer Updated Successfully";
		
	}
	public Document uploadDocument(Document document) {
		return documentRepository.save(document);
	}
	
	public List<Number> getAllActiveNumbers(){
		return numberRepository.findByStatus(0);
	}
	public Customer getCustomerDetailsByPhoneNumber(String phoneNumber) {
		
		return customerRepository.findByPhoneNumber(phoneNumber).get();
	}
	
	public boolean checkNumberExists(String phoneNumber) {
		return customerRepository.existsByPhoneNumber(phoneNumber);

    }
	public long getCustomerByEmail(String email) {
		return customerRepository.findByEmail(email).getCustomerId();
	}
	public Customer getByEmail(String email) {
		return customerRepository.findByEmail(email);
	}
	
	public void deleteUser(Long id) {
		customerRepository.deleteById(id);
	}
	public List<Customer> getAllUsers() {
		return customerRepository.findAll();
	}

}