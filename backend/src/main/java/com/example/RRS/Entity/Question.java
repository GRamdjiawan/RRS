package com.example.RRS.Entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonSubTypes;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = MultipleChoiceQuestion.class, name = "multiple_choice"),
        @JsonSubTypes.Type(value = TrueFalseQuestion.class, name = "true_false")
})

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String questionText;

    public abstract boolean checkAnswer(String answer);

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }
}
