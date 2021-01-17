package com.sunboyy.sblearn.controller;

import java.util.List;

import javax.transaction.Transactional;
import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

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
import com.sunboyy.sblearn.domain.recallcard.Card;
import com.sunboyy.sblearn.domain.recallcard.Lesson;
import com.sunboyy.sblearn.domain.recallcard.RecallcardService;

import lombok.Getter;

@RestController
@RequestMapping("/recallcard")
public class RecallcardController {
	@Autowired
	private RecallcardService recallcardService;

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

	@Transactional
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

	@Transactional
	@PostMapping(value = "/lessons/{lessonId}/cards", params = "_a=move")
	public Result<Object> moveCards(@PathVariable int lessonId, @Valid @RequestBody MoveCardsDto moveCardsDto) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.moveCards(lessonId, moveCardsDto.getToLessonId(), moveCardsDto.getCardIds(), username);
	}

	@Transactional
	@PostMapping(value = "/lessons/{lessonId}/cards", params = "_a=delete")
	public Result<Object> deleteCards(@PathVariable int lessonId, @Valid @RequestBody DeleteCardsDto deleteCardsDto) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.deleteCards(lessonId, deleteCardsDto.getCardIds(), username);
	}

	@PostMapping("/cards")
	public Result<Card> createNewCard(@Valid @RequestBody CreateCardDto createCardDto) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService
				.createCard(createCardDto.getLessonId(), createCardDto.getWord(), createCardDto.getMeaning(), username);
	}

	@Transactional
	@PostMapping("/cards/{cardId}")
	public Result<Card> editCard(@PathVariable int cardId, @Valid @RequestBody EditCardDto editCardDto) {
		String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return recallcardService.editCard(cardId, editCardDto.getWord(), editCardDto.getMeaning(), username);
	}

	@Getter
	private static class CreateLessonDto {
		@Min(value = 1)
		private int courseId;

		@NotBlank
		private String name;
	}

	@Getter
	private static class CreateCardDto {
		@Min(value = 1)
		private int lessonId;

		@NotBlank
		private String word;

		@NotBlank
		private String meaning;
	}

	@Getter
	private static class EditLessonDto {
		@NotBlank
		private String name;
	}

	@Getter
	public static class EditCardDto {
		private String word;

		private String meaning;
	}

	@Getter
	public static class MoveCardsDto {
		@Min(value = 1)
		private int toLessonId;

		@NotEmpty
		private List<Integer> cardIds;
	}

	@Getter
	public static class DeleteCardsDto {
		@NotEmpty
		private List<Integer> cardIds;
	}
}
