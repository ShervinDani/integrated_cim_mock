package com.cim.backend.controller;


import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.cim.backend.model.Number;
import com.cim.backend.model.Customer;
import com.cim.backend.model.Document;
import com.cim.backend.service.CustomerService;

@RestController
@CrossOrigin(origins = "*")
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	@PostMapping("/registerNewCustomer")
	public Customer registerCustomer(@RequestBody Customer newCustomer)
	{
		System.out.println(newCustomer);
		
		return customerService.registerCustomer(newCustomer);
	}
	
    @GetMapping("/api/customers")
    public List<Customer> getAllUsers() {
        return customerService.getAllUsers();
    }
	
    // Delete a user by ID
    @DeleteMapping("/api/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        customerService.deleteUser(id);
    }
//	@GetMapping("/getCustomerDetails")
//	public Customer getCustomerDetails(@RequestBody long customerId) {
//		return customerService.getCustomerDetails(customerId);
//		
//	}
	
	@GetMapping("users/getCustomerDetails/{customerId}")
	public Customer getCustomerDetails(@PathVariable long customerId) {
		Customer customer = customerService.getCustomerDetails(customerId);
		System.out.println(customer.getFirstName());
		return customer;
		
	}
	
	@GetMapping("/getCustomerDetailsByPhoneNumber")
	public Customer getCustomerDetailsByPhoneNumber(@RequestParam String phoneNumber)
	{
		return customerService.getCustomerDetailsByPhoneNumber(phoneNumber);
	}
	
	@PutMapping("/users/updateCustomer")
	public String updateCustomer(@RequestBody Customer customer) {
		return customerService.updateCustomer(customer);
	}
	
	@PostMapping("/uploadDocument")
	public Document uploadDocument(@RequestPart("image") MultipartFile image,
	                               @RequestPart("pdf") MultipartFile pdf,
	                               @RequestPart("customer") Customer customer) {
	    Document document = new Document();
	    try {
	        Long customerId = customer.getCustomerId();
	        if (customerId == null) {
	            throw new IllegalArgumentException("Customer ID is missing in the request");
	        }

	        Customer persistentCustomer = customerService.getCustomerDetails(customerId);
	        document.setCustomer(persistentCustomer);
	        document.setImage(image.getBytes());
	        document.setPdf(pdf.getBytes());
	        document.setStatus(0);

	    } catch (IOException e) {
	        e.printStackTrace();
	        throw new RuntimeException("Failed to read uploaded files", e);
	    } catch (Exception e) {
	        e.printStackTrace();
	        throw new RuntimeException("Error processing document upload", e);
	    }
	    return document;
	}
	
	@GetMapping("/checknumber")
    public boolean checkNumberExists(@RequestParam String phoneNumber) {
        return customerService.checkNumberExists(phoneNumber);
    }
	
	@GetMapping("/getAllActiveNumber")
	public List<Number> getAllActiveNumber()
	{
		return customerService.getAllActiveNumbers();
	}
	
	@PutMapping("/activateNumber")
	public Customer activateNumber(@RequestBody Customer customer)
	{
		return customerService.registerCustomer(customer);
	}
	
	@GetMapping("/getCustomerByEmail/{email}")
	public long getCustomerByEmail(@PathVariable String email) {
		System.out.println("Hello");
	    return customerService.getCustomerByEmail(email);
	}

}