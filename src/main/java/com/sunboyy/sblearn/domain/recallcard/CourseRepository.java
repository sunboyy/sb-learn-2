package com.sunboyy.sblearn.domain.recallcard;

import com.sunboyy.sblearn.domain.recallcard.Course;
import com.sunboyy.sblearn.domain.user.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CourseRepository extends CrudRepository<Course, Integer> {
    List<Course> findAllByOwner(User owner);
}
