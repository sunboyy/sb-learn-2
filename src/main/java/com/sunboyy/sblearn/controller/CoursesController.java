package com.sunboyy.sblearn.controller;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunboyy.sblearn.data.Result;
import com.sunboyy.sblearn.domain.recallcard.Course;
import com.sunboyy.sblearn.domain.recallcard.Lesson;
import com.sunboyy.sblearn.domain.recallcard.RecallcardService;
import com.sunboyy.sblearn.domain.user.User;

import lombok.Getter;

@RestController
@RequestMapping("/recallcard/courses")
public class CoursesController {
	@Autowired
	private RecallcardService recallcardService;

	@GetMapping
	public List<WebCourse> getCourses() {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		List<Course> courses = recallcardService.getCourses(username);
		return courses.stream().map(WebCourse::new).collect(Collectors.toList());
	}

	@PostMapping
	public WebCourse createNewCourse(@Valid @RequestBody CreateCourseDto createCourseDto) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Course course = recallcardService.createCourse(createCourseDto.getName(), username);
		return new WebCourse(course);
	}

	@GetMapping("/{courseId}")
	public WebCourse getCourse(@PathVariable int courseId) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Course course = recallcardService.getCourse(courseId, username);
		return new WebCourse(course);
	}

	@Transactional
	@PutMapping("/{courseId}")
	public WebCourse editCourse(@PathVariable int courseId, @Valid @RequestBody EditCourseDto editCourseDto) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Course course = recallcardService.renameCourse(courseId, editCourseDto.getName(), username);
		return new WebCourse(course);
	}

	@GetMapping("/{courseId}/lessons")
	public Result<List<Lesson>> getLessons(@PathVariable int courseId) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.getLessons(courseId, username);
	}

	@GetMapping("/{courseId}/members")
	public Result<List<User>> getMembers(@PathVariable int courseId) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.getCourseMembers(courseId, username);
	}

	@PostMapping("/{courseId}/add-member")
	public Result<User> addMember(@PathVariable int courseId, @Valid @RequestBody ShareCourseDto shareCourseDto) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.addCourseMember(courseId, shareCourseDto.getUsername(), username);
	}

	@PostMapping("/{courseId}/remove-member")
	public Result<Object> removeMember(@PathVariable int courseId, @Valid @RequestBody ShareCourseDto shareCourseDto) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.removeCourseMember(courseId, shareCourseDto.getUsername(), username);
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

	@Getter
	private static class ShareCourseDto {
		@NotBlank
		private String username;
	}
}
