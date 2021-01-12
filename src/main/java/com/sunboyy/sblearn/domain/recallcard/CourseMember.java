package com.sunboyy.sblearn.domain.recallcard;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import com.sunboyy.sblearn.domain.user.User;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor(access = AccessLevel.PACKAGE)
@Entity
public class CourseMember {
	@EmbeddedId
	private CourseMemberKey id;

	@Getter
	@Setter
	@ManyToOne
	@MapsId("courseId")
	private Course course;

	@Getter
	@Setter
	@ManyToOne
	@MapsId("userId")
	private User user;

	public CourseMember(Course course, User user) {
		this.id = new CourseMemberKey(course.getId(), user.getId());
		this.course = course;
		this.user = user;
	}
}
