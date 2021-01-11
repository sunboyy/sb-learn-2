package com.sunboyy.sblearn.domain.recallcard;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface LessonRepository extends CrudRepository<Lesson, Integer> {
	List<Lesson> findAllByCourse(Course course);
}
