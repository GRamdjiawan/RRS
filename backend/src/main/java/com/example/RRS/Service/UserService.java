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
        return userRepository.findByUsername(username); // Implement repository method to find by username
    }

    public User saveUser(User user) {
        return userRepository.save(user); // Implement repository method to save user
    }

    public List<User> getallUsers() {
        return userRepository.findAll(); // Implement repository method to get all users
    }
}
