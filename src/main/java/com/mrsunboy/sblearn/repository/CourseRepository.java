package com.mrsunboy.sblearn.repository;

import com.mrsunboy.sblearn.data.Course;
import com.mrsunboy.sblearn.data.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CourseRepository extends CrudRepository<Course, Integer> {
    List<Course> findAllByOwner(User owner);
}
