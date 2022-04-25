import Course from './course';

export default class Semester {
	constructor(title, courses) {
		this.title = title;
		this.courses = courses;
	}

	duplicate() {
		return new Semester(
			this.title,
			this.courses.map((course) => course.duplicate())
		);
	}

	toFirestore() {
		return {
			title: this.title,
			courses: this.courses.map((course) => course.toFirestore()),
		};
	}

	toSharedFirestore() {
		return {
			title: this.title,
			courses: this.courses.map((course) => course.toSharedFirestore()),
		};
	}

	static fromSemesterData(semesterData) {
		return new Semester(
			semesterData.title,
			semesterData.courses.map((courseData) => Course.fromCourseData(courseData))
		);
	}
}
