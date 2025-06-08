package com.cim.backend.model;


import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Table(name = "session_data")
@Getter
@Setter
@ToString
@JsonInclude(JsonInclude.Include.NON_NULL)  // <-- Add this to remove nulls in JSON response
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @Column(name = "USER_ID")
    private Long userId;

    @Column(name = "USERNAME")
    private String username;

    @Column(name = "IP_ADDRESS")
    private String ipAddress;

    @Column(name = "LOGIN_TIME")
    private LocalDateTime loginTime;

    @Column(name = "ACTIVE")
    private Integer active;
}