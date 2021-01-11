package com.sunboyy.sblearn.domain.recallcard;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface CardRepository extends CrudRepository<Card, Integer> {
	List<Card> findAllByLesson(Lesson lesson);
}
