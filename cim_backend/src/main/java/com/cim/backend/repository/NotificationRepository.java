package com.cim.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cim.backend.model.Notification;


@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long>{
	public Notification findByCustomerId(long id);
}
