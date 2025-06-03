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

    private Long userId;

    private String username;

    private String ipAddress;

    private LocalDateTime loginTime;

    private boolean active;
}
