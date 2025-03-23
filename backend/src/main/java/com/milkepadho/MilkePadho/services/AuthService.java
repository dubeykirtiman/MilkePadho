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
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return new AuthResponse(null, "Email is already in use");
        }

        String rawPassword = user.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        user.setPassword(encodedPassword);

        System.out.println("Raw Password: " + rawPassword);
        System.out.println("Encoded Password: " + encodedPassword);

        userRepository.save(user);
        String token = jwtUtil.generateToken(user.getEmail());

        return new AuthResponse(token, "User registered successfully");
    }

    public AuthResponse loginUser(AuthRequest authRequest) {
        Optional<User> optionalUser = userRepository.findByEmail(authRequest.getEmail());

        if (optionalUser.isEmpty()) {
            System.out.println("User not found with email: " + authRequest.getEmail());
            return new AuthResponse(null, "Invalid email or password");
        }

        User user = optionalUser.get();
        boolean isPasswordCorrect = passwordEncoder.matches(authRequest.getPassword(), user.getPassword());

        
        System.out.println("🔍 Checking password for user: " + user.getEmail());
        System.out.println("🔍 Stored Password: " + user.getPassword());
        System.out.println("🔍 Entered Password: " + authRequest.getPassword());
        System.out.println("🔍 Password matches: " + isPasswordCorrect);

        if (!isPasswordCorrect) {
            System.out.println("Incorrect password entered.");
            return new AuthResponse(null, "Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        System.out.println("Login successful! Token generated.");

        return new AuthResponse(token, "Login successful");
    }
}
