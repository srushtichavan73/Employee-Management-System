package com.example.demo.controller;

import com.example.demo.Entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/users")
public class UserController {

    @PostMapping("/login")
    public String login(@RequestBody User user) {

        System.out.println("Login API Called");

        User existingUser = userRepository
                .findByUsername(user.getUsername());

        System.out.println(existingUser);

        if (existingUser != null &&
                existingUser.getPassword().equals(user.getPassword())) {

            return "Login Successful";
        }

        return "Invalid Credentials";
    }

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User registerUser(
            @RequestBody User user) {

        return userRepository.save(user);
    }
}