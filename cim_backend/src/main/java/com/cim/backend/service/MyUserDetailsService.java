package com.cim.backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cim.backend.model.UserPrincipal;
import com.cim.backend.model.Users;
import com.cim.backend.repository.UserRepo;
import com.cim.backend.model.Customer;

import com.cim.backend.model.CustomerPrincipal;
import com.cim.backend.repository.CustomerRepository;

//@Service
//public class MyUserDetailsService implements UserDetailsService {
//
//    @Autowired
//    private UserRepo userRepo;
//
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        Users user = userRepo.findByUsername(username);
//        if (user == null) {
//            System.out.println("User Not Found");
//            throw new UsernameNotFoundException("user not found");
//        }
//        
//        return new UserPrincipal(user);
//    }
//}




@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Override
    public UserDetails loadUserByUsername(String input) throws UsernameNotFoundException {
        // First, try to find as Admin/Retailer (Users table)
        Users user = userRepo.findByUsername(input);
        if (user != null) {
            return new UserPrincipal(user); // username-based auth
        }

        // Then try to find as Customer (by email)
        Customer customer = customerRepo.findByEmail(input);
        if (customer != null) {
            return new CustomerPrincipal(customer); // email-based auth
        }

        // If neither found, throw exception
        throw new UsernameNotFoundException("User not found with username or email: " + input);
    }
}
