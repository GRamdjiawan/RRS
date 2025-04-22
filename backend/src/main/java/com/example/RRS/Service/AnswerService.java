package com.example.RRS.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.RRS.Entity.Answer;
import com.example.RRS.Repository.AnswerRepository;

import java.util.*;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    public List<Answer> getAnswersByQuestionId(int questionId) {
        return answerRepository.findByQuestion_id(questionId);
    }

    public Answer saveAnswer(Answer answer) {
        return answerRepository.save(answer);
    }
}
