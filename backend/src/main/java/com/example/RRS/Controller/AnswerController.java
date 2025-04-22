package com.example.RRS.Controller;

import com.example.RRS.Entity.Answer;
import com.example.RRS.Service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @GetMapping("/{questionId}")
    public List<Answer> getAnswersByQuestionId(@PathVariable int questionId) {
        return answerService.getAnswersByQuestionId(questionId);
    }

    @PostMapping
    public Answer createAnswer(@RequestBody Answer answer) {
        return answerService.saveAnswer(answer);
    }
}