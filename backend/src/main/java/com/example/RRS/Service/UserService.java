package com.example.RRS.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.RRS.Entity.User;
import com.example.RRS.Repository.UserRepository;

import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User saveUser(User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            throw new RuntimeException("User already exists");
        } else {
            return userRepository.save(user);
        }
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
