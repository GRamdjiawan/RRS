package com.example.RRS.Controller;

import com.example.RRS.Entity.Quiz;
import com.example.RRS.Service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuizzes();
    }

    @GetMapping("/{id}")
    public Optional<Quiz> getQuizById(@PathVariable int id) {
        return quizService.getQuizById(id);
    }

    @PostMapping
    public Quiz createQuiz(@RequestBody Quiz quiz) {
        return quizService.saveQuiz(quiz);
    }
}