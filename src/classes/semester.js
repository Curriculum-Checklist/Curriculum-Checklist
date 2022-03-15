import Course from './course';

export default class Semester {
	constructor(title, courses) {
		this.title = title;
		this.courses = courses;
	}

	toFirestore() {
		return {
			title: this.title,
			courses: this.courses.map((course) => course.toFirestore()),
		};
	}

	static fromFirestore(semesterData) {
		return new Semester(
			semesterData.title,
			semesterData.courses.map((courseData) => Course.fromFirestore(courseData))
		);
	}
}
