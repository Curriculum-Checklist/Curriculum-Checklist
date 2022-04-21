export default class Course {
	constructor(code, title, units, status, grade, requiredGrade) {
		this.code = code;
		this.title = title;
		this.units = units;
		this.status = status;
		this.grade = grade;
		this.requiredGrade = requiredGrade ?? true;
	}

	duplicate() {
		return new Course(this.code, this.title, this.units, this.status, this.grade, this.requiredGrade);
	}

	toFirestore() {
		return {
			code: this.code,
			title: this.title,
			units: this.units,
			status: this.status,
			grade: this.grade,
			requiredGrade: this.requiredGrade,
		};
	}

	static fromFirestore(courseData) {
		return new Course(
			courseData.code,
			courseData.title,
			courseData.units,
			courseData.status,
			courseData.grade,
			courseData.requiredGrade
		);
	}
}
