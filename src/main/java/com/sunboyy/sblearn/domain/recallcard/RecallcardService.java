package com.sunboyy.sblearn.domain.recallcard;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunboyy.sblearn.data.FailureResult;
import com.sunboyy.sblearn.data.Result;
import com.sunboyy.sblearn.data.SuccessResult;
import com.sunboyy.sblearn.domain.user.User;
import com.sunboyy.sblearn.domain.user.UserRepository;

@Service
public class RecallcardService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private CourseMemberRepository courseMemberRepository;

    public Course getCourse(int courseId, String username) {
		User user = findUserByUsernameOrThrow(username);
		Course course = getCourseAsMember(courseId, user);
        if (course == null) {
        	throw new EntityNotFoundException("course with id=" + courseId + " not found");
        }
        return course;
    }

	public List<Course> getCourses(String username) {
		User user = findUserByUsernameOrThrow(username);
		List<Course> courses = courseRepository.findAllByOwner(user);
        List<CourseMember> courseMembers = courseMemberRepository.findAllByUser(user);
        courseMembers.stream().map(CourseMember::getCourse).collect(Collectors.toCollection(() -> courses));
        return courses;
    }

    public Course createCourse(String name, String ownerUsername) {
        User user = findUserByUsernameOrThrow(ownerUsername);
        Course course = new Course();
        course.setName(name);
        course.setOwner(user);
        courseRepository.save(course);
        return course;
    }

    public Course renameCourse(int courseId, String name, String ownerUsername) {
        User user = findUserByUsernameOrThrow(ownerUsername);
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        if (optionalCourse.isEmpty() || !optionalCourse.get().getOwner().equals(user)) {
			throw new EntityNotFoundException("course with id=" + courseId + " not found");
        }
        Course course = optionalCourse.get();
        course.setName(name);
        courseRepository.save(course);
        return course;
    }

    public Result<List<Lesson>> getLessons(int courseId, String username) {
        User user = findUserByUsernameOrThrow(username);
        Course course = getCourseAsMember(courseId, user);
        if (course == null) {
            return new FailureResult<>("Course not found");
        }
        List<Lesson> lessons = lessonRepository.findAllByCourse(course);
        return new SuccessResult<>(lessons);
    }

    public Result<Lesson> getLesson(int lessonId, String username) {
        User user = findUserByUsernameOrThrow(username);
        Lesson lesson = getLessonAsMember(lessonId, user);
        if (lesson == null) {
            return new FailureResult<>("Lesson not found");
        }
        return new SuccessResult<>(lesson);
    }

    public Result<Lesson> createLesson(int courseId, String name, String username) {
        if (name.length() <= 0) {
            return new FailureResult<>("Lesson name is not defined");
        }
        User user = findUserByUsernameOrThrow(username);
        Optional<Course> course = courseRepository.findById(courseId);
        if (course.isEmpty() || !course.get().getOwner().equals(user)) {
            return new FailureResult<>("Course not found");
        }
        Lesson lesson = new Lesson();
        lesson.setName(name);
        lesson.setCourse(course.get());
        lessonRepository.save(lesson);
        return new SuccessResult<>(lesson);
    }

    public Result<Lesson> renameLesson(int lessonId, String name, String username) {
        User user = findUserByUsernameOrThrow(username);
        Optional<Lesson> optionalLesson = lessonRepository.findById(lessonId);
        if (optionalLesson.isEmpty() || !optionalLesson.get().getCourse().getOwner().equals(user)) {
            return new FailureResult<>("Lesson not found");
        }
        Lesson lesson = optionalLesson.get();
        lesson.setName(name);
        lessonRepository.save(lesson);
        return new SuccessResult<>(lesson);
    }

    public Result<List<Card>> getCards(int lessonId, String username) {
        User user = findUserByUsernameOrThrow(username);
        Lesson lesson = getLessonAsMember(lessonId, user);
        if (lesson == null) {
            return new FailureResult<>("Lesson not found");
        }
        List<Card> cards = cardRepository.findAllByLesson(lesson);
        return new SuccessResult<>(cards);
    }

    public Result<Card> createCard(int lessonId, String word, String meaning, String username) {
        User user = findUserByUsernameOrThrow(username);
        Optional<Lesson> lesson = lessonRepository.findById(lessonId);
        if (lesson.isEmpty() || !lesson.get().getCourse().getOwner().equals(user)) {
            return new FailureResult<>("Lesson not found");
        }
        Card card = new Card();
        card.setWord(word);
        card.setMeaning(meaning);
        card.setLesson(lesson.get());
        cardRepository.save(card);
        return new SuccessResult<>(card);
    }

    public Result<Card> editCard(int cardId, String word, String meaning, String username) {
        User user = findUserByUsernameOrThrow(username);
        Optional<Card> optionalCard = cardRepository.findById(cardId);
        if (optionalCard.isEmpty() || !optionalCard.get().getLesson().getCourse().getOwner().equals(user)) {
            return new FailureResult<>("Card not found");
        }
        Card card = optionalCard.get();
        if (word != null && !word.trim().equals("")) {
            card.setWord(word);
        }
        if (meaning != null && !meaning.trim().equals("")) {
            card.setMeaning(meaning);
        }
        cardRepository.save(card);
        return new SuccessResult<>(card);
    }

    public Result<Object> deleteCard(int cardId, String username) {
		User user = findUserByUsernameOrThrow(username);
        Optional<Card> card = cardRepository.findById(cardId);
        if (card.isEmpty() || !card.get().getLesson().getCourse().getOwner().equals(user)) {
            return new FailureResult<>("Card not found");
        }
        cardRepository.delete(card.get());
        return new SuccessResult<>(null);
    }

    public Result<List<User>> getCourseMembers(int courseId, String username) {
		User user = findUserByUsernameOrThrow(username);
        Optional<Course> optionalCourse = courseRepository.findById(courseId);
        if (optionalCourse.isEmpty() || !optionalCourse.get().getOwner().equals(user)) {
            return new FailureResult<>("Course not found");
        }
        List<CourseMember> courseMembers = courseMemberRepository.findAllByCourse(optionalCourse.get());
        List<User> members = courseMembers.stream().map(CourseMember::getUser).collect(Collectors.toList());
        return new SuccessResult<>(members);
    }

    public Result<User> addCourseMember(int courseId, String targetUsername, String username) {
		User user = findUserByUsernameOrThrow(username);
        Optional<Course> course = courseRepository.findById(courseId);
        if (course.isEmpty() || !course.get().getOwner().equals(user)) {
            return new FailureResult<>("Course not found");
        }
        User targetUser = userRepository.findByUsername(targetUsername);
        if (targetUser == null) {
            return new FailureResult<>("User not found");
        }
        if (user.equals(targetUser)) {
            return new FailureResult<>("Cannot share to yourself");
        }
        CourseMember courseMember = new CourseMember(course.get(), targetUser);
        courseMemberRepository.save(courseMember);
        return new SuccessResult<>(targetUser);
    }

    public Result<Object> removeCourseMember(int courseId, String targetUsername, String username) {
		User user = findUserByUsernameOrThrow(username);
        Optional<Course> course = courseRepository.findById(courseId);
        if (course.isEmpty() || !course.get().getOwner().equals(user)) {
            return new FailureResult<>("Course not found");
        }
        User targetUser = userRepository.findByUsername(targetUsername);
        if (targetUser == null) {
            return new FailureResult<>("User not found");
        }
        if (user.equals(targetUser)) {
            return new FailureResult<>("Cannot un-share to yourself");
        }
        Optional<CourseMember> optionalCourseMember = courseMemberRepository
                .findById(new CourseMemberKey(courseId, targetUser.getId()));
        courseMemberRepository.deleteById(new CourseMemberKey(courseId, targetUser.getId()));
        return new SuccessResult<>(null);
    }

	private User findUserByUsernameOrThrow(String username) {
		User user = userRepository.findByUsername(username);
		if (user == null) {
			throw new EntityNotFoundException("user with username=" + username + " not found");
		}
		return user;
	}

    private Course getCourseAsMember(int courseId, User user) {
		Optional<Course> optionalCourse = courseRepository.findById(courseId);
		if (optionalCourse.isEmpty()) {
			return null;
		}

		Course course = optionalCourse.get();
		if (course.getOwner().equals(user)) {
			return course;
		}

        boolean isMember = courseMemberRepository.existsById(new CourseMemberKey(courseId, user.getId()));
		if (!isMember) {
			return null;
		}
		return course;
	}

	private Lesson getLessonAsMember(int lessonId, User user) {
        Optional<Lesson> optionalLesson = lessonRepository.findById(lessonId);
        if (optionalLesson.isEmpty()) {
            return null;
        }

        Lesson lesson = optionalLesson.get();
        if (lesson.getCourse().getOwner().equals(user)) {
            return lesson;
        }

        boolean isMember = courseMemberRepository.existsById((new CourseMemberKey(lesson.getCourse().getId(), user.getId())));
        if (!isMember) {
            return null;
        }
        return lesson;
    }
}
