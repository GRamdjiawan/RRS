package com.example.RRS.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.RRS.Entity.Answer;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    List<Answer> findByQuestion_id(int id);
}
