package com.cim.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "cim_numbers")
@Data
public class Number {
	
	@Id
	private long phoneNumber;
	private int status;
}