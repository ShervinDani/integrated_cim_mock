package com.cim.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "retailer_create")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RetailCreation{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "retailer_id")
    private Long retailerId;

    @Column(name = "first_name", length = 100)
    private String firstName;

    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(name = "business_name", length = 150)
    private String businessName;

    @Column(name = "registration_date")
    private LocalDate registrationDate;

    @Column(name = "email", length = 150)
    private String email;

    @Column(name = "address", length = 200)
    private String address;

    @Column(name = "phone_number", length = 15)
    private String phoneNumber;

    @Column(name = "status", length = 50)
    private String status;
}
