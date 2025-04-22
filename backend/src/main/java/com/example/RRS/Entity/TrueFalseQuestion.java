package com.example.RRS.Entity;

import jakarta.persistence.Entity;

@Entity
public class TrueFalseQuestion extends Question {

    private boolean correct;

    @Override
    public boolean checkAnswer(String answer) {
        return Boolean.parseBoolean(answer) == correct;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }
}
