package com.sunboyy.sblearn.controller;

import org.springframework.security.core.context.SecurityContextHolder;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import com.sunboyy.sblearn.domain.recallcard.Course;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class WebCourse {
	@JsonUnwrapped
	private final Course course;

	@JsonProperty("isOwner")
	public boolean isOwner() {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return course.getOwner().getUsername().equals(username);
	}
}
