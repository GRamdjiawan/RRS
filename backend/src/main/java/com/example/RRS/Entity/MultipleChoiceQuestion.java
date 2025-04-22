package com.example.RRS.Entity;

import jakarta.persistence.Entity;

@Entity
public class MultipleChoiceQuestion extends Question {

    private String correctOption;

    @Override
    public boolean checkAnswer(String answer) {
        return answer != null && answer.equalsIgnoreCase(correctOption);
    }

    public String getCorrectOption() {
        return correctOption;
    }

    public void setCorrectOption(String correctOption) {
        this.correctOption = correctOption;
    }
}
