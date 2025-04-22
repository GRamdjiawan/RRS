package com.example.RRS.Controller;

import com.example.RRS.Entity.UserScore;
import com.example.RRS.Service.UserScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
public class UserScoreController {

    @Autowired
    private UserScoreService userScoreService;

    @GetMapping("/user/{userId}")
    public List<UserScore> getScoresByUserId(@PathVariable int userId) {
        return userScoreService.getScoresByUserId(userId);
    }

    @PostMapping
    public UserScore createScore(@RequestBody UserScore userScore) {
        return userScoreService.saveScore(userScore);
    }
}