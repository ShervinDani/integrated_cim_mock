package com.cim.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cim.backend.model.Session;

import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {

    List<Session> findByActiveTrue(); // ✅ Correct name
    List<Session> findByUserId(Long userId);
    List<Session> findByUserIdAndActiveTrue(Long userId); // ✅ For terminateSessionsByUserId
}
