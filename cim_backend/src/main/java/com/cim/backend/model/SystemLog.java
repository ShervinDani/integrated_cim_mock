package com.cim.backend.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@Table(name = "system_log")
@Getter
@Setter
public class SystemLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventType;
    private String username;

    @Column(name = "system_time") // <-- map to correct column
    private LocalDateTime timestamp;

    private String message;

    @Column(name = "ip_address") // <-- map to correct column if you want to use it
    private String ipAddress;
}