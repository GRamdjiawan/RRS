package com.example.RRS.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.RRS.Entity.UserScore;

import java.util.List;

public interface UserScoreRepository extends JpaRepository<UserScore, Long> {
    List<UserScore> findByUser_Id(int id);
}
