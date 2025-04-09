package com.example.RRS.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.RRS.Entity.Question;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Integer> {
    List<Question> findByQuiz_QuizId(int quizId);
}
