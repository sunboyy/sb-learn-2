package com.sunboyy.sblearn.domain.recallcard;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.sunboyy.sblearn.domain.user.User;

public interface CourseMemberRepository extends CrudRepository<CourseMember, CourseMemberKey> {
	List<CourseMember> findAllByUser(User user);
	List<CourseMember> findAllByCourse(Course course);
}
