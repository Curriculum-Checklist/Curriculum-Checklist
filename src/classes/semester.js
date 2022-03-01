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
}
