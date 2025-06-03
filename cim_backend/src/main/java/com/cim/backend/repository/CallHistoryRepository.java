package com.cim.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cim.backend.model.CallHistory;

import java.util.List;

@Repository
public interface CallHistoryRepository extends JpaRepository<CallHistory, Long>{
	public List<CallHistory> findByCustomerId(Long id);
}
