package com.example.RRS.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_scores")
public class UserScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    private int score;

    public UserScore() {
    }

    public UserScore(User user, Quiz quiz, int score) {
        this.user = user;
        this.quiz = quiz;
        this.score = score;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    @Override
    public String toString() {
        return "UserScore{" +
                "id=" + id +
                ", user=" + user +
                ", quiz=" + quiz +
                ", score=" + score +
                '}';
    }
}
