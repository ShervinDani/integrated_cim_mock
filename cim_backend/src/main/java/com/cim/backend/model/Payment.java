package com.cim.backend.model;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "crm_payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id")  // maps to DB column
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;

    private Double amount;
    private String status;
    private LocalDateTime paymentDate;
}