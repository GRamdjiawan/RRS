package com.example.RRS.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.RRS.Entity.Question;
import com.example.RRS.Repository.QuestionRepository;

import java.util.*;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public List<Question> getQuestionsByQuizId(int quizId) {
        return questionRepository.findByQuiz_QuizId(quizId);
    }

    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }
}
