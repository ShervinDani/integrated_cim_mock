package com.cim.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cim.backend.model.CallHistory;
import com.cim.backend.service.CallHistoryService;

@RestController
@CrossOrigin(origins = "*")

public class CallHistoryController {
	
	@Autowired
	CallHistoryService callHistoryService;
	
	@GetMapping("/call-history/{customerId}")
    public List<CallHistory> getCallHistory(@PathVariable Long customerId) {
        return callHistoryService.getCallHistory(customerId);
    }

    @PostMapping("/call-history")
    public CallHistory addCallHistory(@RequestBody CallHistory history) {
        return callHistoryService.addCallHistory(history);
    }


}
