package com.example.RRS.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.RRS.Entity.UserScore;
import com.example.RRS.Repository.UserScoreRepository;

import java.util.*;

@Service
public class UserScoreService {

    @Autowired
    private UserScoreRepository userScoreRepository;

    public List<UserScore> getScoresByUserId(int userId) {
        return userScoreRepository.findByUser_Id(userId);
    }

    public UserScore saveScore(UserScore userScore) {
        return userScoreRepository.save(userScore);
    }
}
