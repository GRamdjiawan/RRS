package com.example.RRS.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.RRS.Entity.Quiz;

public interface QuizRepository extends JpaRepository<Quiz, Integer> {
}
