package com.example.RRS.Controller;

import com.example.RRS.Entity.Question;
import com.example.RRS.Service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @GetMapping
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @GetMapping("/{quizId}")
    public List<Question> getQuestionsByQuizId(@PathVariable int quizId) {
        return questionService.getQuestionsByQuizId(quizId);
    }

    @PostMapping
    public Question createQuestion(@RequestBody Question question) {
        return questionService.saveQuestion(question);
    }
}