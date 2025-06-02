package com.cim.backend.repository;


import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cim.backend.model.Notification;


@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>{
	public List<Notification> findByCustomerId(long id);
}