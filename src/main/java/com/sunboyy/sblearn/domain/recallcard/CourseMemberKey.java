package com.sunboyy.sblearn.domain.recallcard;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@AllArgsConstructor
@Embeddable
public class CourseMemberKey implements Serializable {
	@Column(name = "course_id")
	private int courseId;

	@Column(name = "user_id")
	private int userId;
}
