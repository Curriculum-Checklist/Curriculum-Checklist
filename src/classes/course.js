export default class Course {
	constructor(code, title, units, status, grade) {
		this.code = code;
		this.title = title;
		this.units = units;
		this.status = status;
		this.grade = grade;
	}

	toFirestore() {
		return {
			code: this.code,
			title: this.title,
			units: this.units,
			status: this.status,
			grade: this.grade,
		};
	}
}
