package com.example.RRS.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.RRS.Entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username); // Method to find a user by username

}
