package com.sunboyy.sblearn.controller;

import com.sunboyy.sblearn.domain.recallcard.Card;
import com.sunboyy.sblearn.domain.recallcard.Course;
import com.sunboyy.sblearn.domain.recallcard.Lesson;
import com.sunboyy.sblearn.data.Result;
import com.sunboyy.sblearn.domain.recallcard.RecallcardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
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
    public Result<Course> createNewCourse(@Valid @RequestBody CreateCourseDto createCourseDto) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return recallcardService.createCourse(createCourseDto.getName(), username);
    }

    @GetMapping("/course/get")
    public Result<Course> getCourse(@RequestParam int courseId) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return recallcardService.getCourse(courseId, username);
    }

    @PostMapping("/course/edit")
    public Result<Course> editCourse(@Valid @RequestBody EditCourseDto editCourseDto) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return recallcardService.renameCourse(editCourseDto.getCourseId(), editCourseDto.getName(), username);
    }

    @GetMapping("/lesson/get")
    public Result<Lesson> getLessons(@RequestParam int lessonId) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return recallcardService.getLesson(lessonId, username);
    }

    @PostMapping("/lesson/new")
    public Result<Lesson> createNewLesson(@Valid @RequestBody CreateLessonDto createLessonDto) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return recallcardService.createLesson(createLessonDto.getCourseId(), createLessonDto.getName(), username);
    }

    @PostMapping("/lesson/edit")
    public Result<Lesson> editLesson(@Valid @RequestBody EditLessonDto editLessonDto) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return recallcardService.renameLesson(editLessonDto.getLessonId(), editLessonDto.getName(), username);
    }

    @PostMapping("/card/new")
    public Result<Card> createNewCard(@Valid @RequestBody CreateCardDto createCardDto) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return recallcardService.createCard(createCardDto.getLessonId(), createCardDto.getWord(), createCardDto.getMeaning(), username);
    }

    @PostMapping("/card/edit")
    public Result<Card> editCard(@Valid @RequestBody EditCardDto editCardDto) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return recallcardService.editCard(editCardDto.getCardId(), editCardDto.getWord(), editCardDto.getMeaning(), username);
    }

    @DeleteMapping("/card/delete")
    public Result<Object> deleteCard(@RequestParam int cardId) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return recallcardService.deleteCard(cardId, username);
    }

    private static class CreateCourseDto {
        @NotBlank
        private String name;

        public String getName() {
            return name;
        }
    }

    private static class EditCourseDto {
        @Min(value = 1)
        private int courseId;

        @NotBlank
        private String name;

        public int getCourseId() {
            return courseId;
        }

        public String getName() {
            return name;
        }
    }

    private static class CreateLessonDto {
        @Min(value = 1)
        private int courseId;

        @NotBlank
        private String name;

        public int getCourseId() {
            return courseId;
        }

        public String getName() {
            return name;
        }
    }

    private static class CreateCardDto {
        @Min(value = 1)
        private int lessonId;

        @NotBlank
        private String word;

        @NotBlank
        private String meaning;

        public int getLessonId() {
            return lessonId;
        }

        public String getWord() {
            return word;
        }

        public String getMeaning() {
            return meaning;
        }
    }

    private static class EditLessonDto {
        @Min(value = 1)
        private int lessonId;

        @NotBlank
        private String name;

        public int getLessonId() {
            return lessonId;
        }

        public String getName() {
            return name;
        }
    }

    public static class EditCardDto {
        @Min(value = 1)
        private int cardId;

        private String word;

        private String meaning;

        public int getCardId() {
            return cardId;
        }

        public String getWord() {
            return word;
        }

        public String getMeaning() {
            return meaning;
        }
    }
}
