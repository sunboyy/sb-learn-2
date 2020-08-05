package com.mrsunboy.sblearn.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mrsunboy.sblearn.user.User;

import javax.persistence.*;
import java.util.List;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    @JsonIgnoreProperties("ownedCourses")
    @ManyToOne
    private User owner;

    @JsonIgnoreProperties({"course", "cards"})
    @OneToMany(mappedBy = "course")
    private List<Lesson> lessons;

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public User getOwner() {
        return owner;
    }

    public List<Lesson> getLessons() {
        return lessons;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
