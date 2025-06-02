package com.cim.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cim.backend.model.Number;
@Repository
public interface NumberRepository extends JpaRepository<Number, Long>{
	
	public List<Number> findByStatus(int status);
	public Number findByPhoneNumber(long phoneNumber);

}