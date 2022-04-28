export default class Course {
	static numericalGradeOptions = [
		'1.00',
		'1.25',
		'1.50',
		'1.75',
		'2.00',
		'2.25',
		'2.50',
		'2.75',
		'3.00',
		'4.00',
		'5.00',
	];
	static gradeOptions = [...Course.numericalGradeOptions, 'INC', 'DRP', 'N/A'];

	static numericalGradeToColor = {
		'1.00': 'var(--red-theme)',
		1.25: 'var(--blue-theme)',
		'1.50': 'var(--green-theme)',
		1.75: 'var(--orange-theme)',
		'2.00': 'purple',
		2.25: 'var(--yellow-theme)',
		'2.50': 'var(--pink)',
		2.75: 'var(--ocean-blue-light)',
		'3.00': 'brown',
		'4.00': 'gray',
		'5.00': 'black',
	};

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

	isNumericGrade() {
		return Course.numericalGradeOptions.includes(this.grade);
	}

	isValidGrade() {
		return this.isNumericGrade() && this.requiredGrade;
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

	toSharedFirestore() {
		return {
			code: this.code,
			title: this.title,
			units: this.units,
			status: 'Not Taken',
			grade: 'N/A',
			requiredGrade: this.requiredGrade,
		};
	}

	static fromCourseData(courseData) {
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
