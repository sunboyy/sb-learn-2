package com.mrsunboy.sblearn.controller;

import com.mrsunboy.sblearn.data.Card;
import com.mrsunboy.sblearn.data.Course;
import com.mrsunboy.sblearn.data.Lesson;
import com.mrsunboy.sblearn.data.Result;
import com.mrsunboy.sblearn.service.RecallcardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recallcard")
public class RecallcardController {
    @Autowired
    private RecallcardService recallcardService;

    @GetMapping("/course/all")
    public Result<List<Course>> getCourses() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return recallcardService.getCourses(username);
    }

    @PostMapping("/course/new")
    public Result<Course> createNewCourse(@RequestParam String name) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return recallcardService.createCourse(name, username);
    }

    @GetMapping("/course/get")
    public Result<Course> getCourse(@RequestParam int courseId) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return recallcardService.getCourse(courseId, username);
    }

    @GetMapping("/lesson/get")
    public Result<Lesson> getLessons(@RequestParam int lessonId) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return recallcardService.getLesson(lessonId, username);
    }

    @PostMapping("/lesson/new")
    public Result<Lesson> createNewLesson(@RequestParam int courseId, @RequestParam String name) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return recallcardService.createLesson(courseId, name, username);
    }

    @PostMapping("/card/new")
    public Result<Card> createNewCard(@RequestParam int lessonId, @RequestParam String word, @RequestParam String meaning) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return recallcardService.createCard(lessonId, word, meaning, username);
    }
}
