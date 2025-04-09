package com.example.RRS.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.RRS.Entity.UserScore;

import java.util.List;

public interface UserScoreRepository extends JpaRepository<UserScore, Integer> {
    List<UserScore> findByUser_UserId(int userId);
}
