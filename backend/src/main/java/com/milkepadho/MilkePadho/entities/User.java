package com.milkepadho.MilkePadho.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String userClass; 

    @Column(nullable = false)
    private String exam;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phone; 

    @Column(nullable = false)
    private String password;
}
