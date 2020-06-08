package com.mrsunboy.sblearn.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String word;

    private String meaning;

    @JsonIgnoreProperties("cards")
    @ManyToOne
    private Lesson lesson;

    public Integer getId() {
        return id;
    }

    public String getWord() {
        return word;
    }

    public String getMeaning() {
        return meaning;
    }

    public Lesson getLesson() {
        return lesson;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }

    public void setLesson(Lesson lesson) {
        this.lesson = lesson;
    }
}
