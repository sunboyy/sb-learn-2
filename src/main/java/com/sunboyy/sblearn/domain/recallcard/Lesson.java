package com.sunboyy.sblearn.domain.recallcard;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    @JsonIgnoreProperties("lessons")
    @ManyToOne
    private Course course;

    @JsonIgnoreProperties("lesson")
    @OneToMany(mappedBy = "lesson")
    private List<Card> cards;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Course getCourse() {
        return course;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
