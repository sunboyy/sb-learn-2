package com.mrsunboy.sblearn.repository;

import com.mrsunboy.sblearn.data.Lesson;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LessonRepository extends CrudRepository<Lesson, Integer> {
}
