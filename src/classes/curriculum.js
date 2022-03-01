export default class Curriculum {
	constructor(title, programName, schoolName, semesters) {
		this.title = title;
		this.programName = programName;
		this.schoolName = schoolName;
		this.semesters = semesters;
	}

	toFirestore() {
		return {
			title: this.title,
			programName: this.programName,
			schoolName: this.schoolName,
			semesters: this.semesters.map((semester) => semester.toFirestore()),
		};
	}
}
