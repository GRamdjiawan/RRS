package com.example.RRS.Controller;

import com.example.RRS.Entity.User;
import com.example.RRS.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PostMapping
    public Map<String, Object> createUser(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        if (userService.findByUsername(user.getUsername()).isPresent()) {
            response.put("success", false);
            response.put("message", "User already exists");
            return response;
        } else {
            User savedUser = userService.saveUser(user);
            response.put("success", true);
            response.put("user", savedUser);
            return response;
        }
    }

    @GetMapping("/{username}")
    public Map<String, Object> getUserByUsername(@PathVariable String username) {
        Optional<User> user = userService.findByUsername(username);
        Map<String, Object> response = new HashMap<>();
        if (user.isPresent()) {
            response.put("success", true);
            response.put("user", user.get());
        } else {
            response.put("success", false);
            response.put("message", "User not found");
        }
        return response;
    }
}