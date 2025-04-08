package com.example.RRS.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.RRS.Entity.User;
import com.example.RRS.Service.UserService;

import java.util.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{username}")
    public Optional<User> getUserByUsername(@PathVariable String username) {
        return userService.findByUsername(username);
    }

    // @PostMapping("/")
    // public User createUser(@RequestBody User user) {
    // return userService.saveUser(user);
    // }
    @GetMapping("/")
    public List<User> getAllUsers() {
        return userService.getallUsers();
    }

}
