package com.sunboyy.sblearn.controller;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunboyy.sblearn.data.Result;
import com.sunboyy.sblearn.domain.recallcard.Card;
import com.sunboyy.sblearn.domain.recallcard.Course;
import com.sunboyy.sblearn.domain.recallcard.Lesson;
import com.sunboyy.sblearn.domain.recallcard.RecallcardService;

@RestController
@RequestMapping("/recallcard")
public class RecallcardController {
	@Autowired
	private RecallcardService recallcardService;

	@GetMapping("/courses")
	public Result<List<Course>> getCourses() {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.getCourses(username);
	}

	@PostMapping("/courses")
	public Result<Course> createNewCourse(@Valid @RequestBody CreateCourseDto createCourseDto) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.createCourse(createCourseDto.getName(), username);
	}

	@GetMapping("/courses/{courseId}")
	public Result<Course> getCourse(@PathVariable int courseId) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.getCourse(courseId, username);
	}

	@PutMapping("/courses/{courseId}")
	public Result<Course> editCourse(@PathVariable int courseId, @Valid @RequestBody EditCourseDto editCourseDto) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.renameCourse(courseId, editCourseDto.getName(), username);
	}

	@GetMapping("/course/{courseId}/lessons")
	public Result<List<Lesson>> getLessons(@PathVariable int courseId) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.getLessons(courseId, username);
	}

	@GetMapping("/lessons/{lessonId}")
	public Result<Lesson> getLesson(@PathVariable int lessonId) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.getLesson(lessonId, username);
	}

	@PostMapping("/lessons")
	public Result<Lesson> createNewLesson(@Valid @RequestBody CreateLessonDto createLessonDto) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.createLesson(createLessonDto.getCourseId(), createLessonDto.getName(), username);
	}

	@PutMapping("/lessons/{lessonId}")
	public Result<Lesson> editLesson(@PathVariable int lessonId, @Valid @RequestBody EditLessonDto editLessonDto) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.renameLesson(lessonId, editLessonDto.getName(), username);
	}

	@GetMapping("/lessons/{lessonId}/cards")
	public Result<List<Card>> getCards(@PathVariable int lessonId) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.getCards(lessonId, username);
	}

	@PostMapping("/cards")
	public Result<Card> createNewCard(@Valid @RequestBody CreateCardDto createCardDto) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService
				.createCard(createCardDto.getLessonId(), createCardDto.getWord(), createCardDto.getMeaning(), username);
	}

	@PostMapping("/cards/{cardId}")
	public Result<Card> editCard(@PathVariable int cardId, @Valid @RequestBody EditCardDto editCardDto) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.editCard(cardId, editCardDto.getWord(), editCardDto.getMeaning(), username);
	}

	@DeleteMapping("/cards/{cardId}")
	public Result<Object> deleteCard(@PathVariable int cardId) {
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
		@NotBlank
		private String name;

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
		@NotBlank
		private String name;

		public String getName() {
			return name;
		}
	}

	public static class EditCardDto {
		private String word;

		private String meaning;

		public String getWord() {
			return word;
		}

		public String getMeaning() {
			return meaning;
		}
	}
}
