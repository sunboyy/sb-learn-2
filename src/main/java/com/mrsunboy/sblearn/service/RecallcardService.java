package com.mrsunboy.sblearn.service;

import com.mrsunboy.sblearn.data.*;
import com.mrsunboy.sblearn.repository.CardRepository;
import com.mrsunboy.sblearn.repository.CourseRepository;
import com.mrsunboy.sblearn.repository.LessonRepository;
import com.mrsunboy.sblearn.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecallcardService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private CardRepository cardRepository;

    public Result<Course> getCourse(int courseId, String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return new FailureResult<>("User not found");
        }
        Optional<Course> course = courseRepository.findById(courseId);
        if (course.isEmpty() || !course.get().getOwner().equals(user)) {
            return new FailureResult<>("Course not found");
        }
        return new SuccessResult<>(course.get());
    }

    public Result<List<Course>> getCourses(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return new FailureResult<>("User not found");
        }
        return new SuccessResult<>(courseRepository.findAllByOwner(user));
    }

    public Result<Course> createCourse(String name, String ownerUsername) {
        User user = userRepository.findByUsername(ownerUsername);
        if (user == null) {
            return new FailureResult<>("User not found");
        }
        return createCourse(name, user);
    }

    private Result<Course> createCourse(String name, User owner) {
        Course course = new Course();
        course.setName(name);
        course.setOwner(owner);
        courseRepository.save(course);
        return new SuccessResult<>(course);
    }

    public Result<Course> renameCourse(int courseId, String name, String ownerUsername) {
        User user = userRepository.findByUsername(ownerUsername);
        if (user == null) {
            return new FailureResult<>("User not found");
        }
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        if (optionalCourse.isEmpty() || !optionalCourse.get().getOwner().equals(user)) {
            return new FailureResult<>("Course not found");
        }
        Course course = optionalCourse.get();
        course.setName(name);
        courseRepository.save(course);
        return new SuccessResult<>(course);
    }

    public Result<Lesson> getLesson(int lessonId, String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return new FailureResult<>("User not found");
        }
        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        if (lesson.isEmpty() || !lesson.get().getCourse().getOwner().equals(user)) {
            return new FailureResult<>("Lesson not found");
        }
        return new SuccessResult<>(lesson.get());
    }

    public Result<Lesson> createLesson(int courseId, String name, String username) {
        if (name.length() <= 0) {
            return new FailureResult<>("Lesson name is not defined");
        }
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return new FailureResult<>("User not found");
        }
        Optional<Course> course = courseRepository.findById(courseId);
        if (course.isEmpty() || !course.get().getOwner().equals(user)) {
            return new FailureResult<>("Course not found");
        }
        Lesson lesson = new Lesson();
        lesson.setName(name);
        lesson.setCourse(course.get());
        lessonRepository.save(lesson);
        return new SuccessResult<>(lesson);
    }

    public Result<Lesson> renameLesson(int lessonId, String name, String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return new FailureResult<>("User not found");
        }
        Optional<Lesson> optionalLesson = lessonRepository.findById(lessonId);
        if (optionalLesson.isEmpty() || !optionalLesson.get().getCourse().getOwner().equals(user)) {
            return new FailureResult<>("Course not found");
        }
        Lesson lesson = optionalLesson.get();
        lesson.setName(name);
        lessonRepository.save(lesson);
        return new SuccessResult<>(lesson);
    }

    public Result<Card> createCard(int lessonId, String word, String meaning, String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return new FailureResult<>("User not found");
        }
        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        if (lesson.isEmpty() || !lesson.get().getCourse().getOwner().equals(user)) {
            return new FailureResult<>("Lesson not found");
        }
        Card card = new Card();
        card.setWord(word);
        card.setMeaning(meaning);
        card.setLesson(lesson.get());
        cardRepository.save(card);
        return new SuccessResult<>(card);
    }
}
