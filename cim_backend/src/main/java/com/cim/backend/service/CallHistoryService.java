package com.cim.backend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cim.backend.model.CallHistory;
import com.cim.backend.repository.CallHistoryRepository;

@Service
public class CallHistoryService {
	
	@Autowired
	CallHistoryRepository callHistoryRepository;
	
	public List<CallHistory> getCallHistory(Long id) {
        return callHistoryRepository.findByCustomerId(id);
    }

    public CallHistory addCallHistory(CallHistory history) {
        return callHistoryRepository.save(history);
    }


}