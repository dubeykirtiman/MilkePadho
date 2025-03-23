package com.milkepadho.MilkePadho.services;

import com.milkepadho.MilkePadho.entities.AuthRequest;
import com.milkepadho.MilkePadho.entities.AuthResponse;
import com.milkepadho.MilkePadho.entities.User;
import com.milkepadho.MilkePadho.repositories.UserRepository;
import com.milkepadho.MilkePadho.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse registerUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            throw new RuntimeException("User already registered with this email");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword())); 
        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getEmail()); 
        return new AuthResponse(token, "Registration successful");
    }

    public AuthResponse loginUser(AuthRequest authRequest) {
        Optional<User> userOptional = userRepository.findByEmail(authRequest.getEmail());

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOptional.get();
        if (!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Incorrect password");
        }

        String token = jwtUtil.generateToken(user.getEmail()); 
        return new AuthResponse(token, "Login successful");
    }
}
