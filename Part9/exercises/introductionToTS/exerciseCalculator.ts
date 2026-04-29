interface exerciseValues {
	periodLength: number;
	trainingDays: number;
	target: number;
	average: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
}

const calculateExercises = (dailyHours: Array<number>, target: number): exerciseValues => {
	const periodLength: number = dailyHours.length;
	const trainingDays: number = dailyHours.filter(h => h > 0).length;
	let totalTrainingHours: number = 0;
	dailyHours.map(h => totalTrainingHours += h);
	const average: number = totalTrainingHours / periodLength;
	const success: boolean = average >= target ? true : false;
	let rating: number = 0;
	let ratingDescription: string = '';

	if (average <= target / 2) {
		rating = 1;
		ratingDescription = 'It\'s really bad';
	} else if (average < target) {
		rating = 2;
		ratingDescription = 'Not too bad but could be better';
	} else if (average > target) {
		rating = 3;
		ratingDescription = 'Well done! you\'ve reached your objective';
	}

	return {
		periodLength: periodLength,
		trainingDays: trainingDays,
		target: target,
		average: average,
		success: success,
		rating: rating,
		ratingDescription: ratingDescription
	}
}

const exampleArray: Array<number> = [1, 0, 1, 1, 0, 1, 1];
const exampleTarget: number = 3;

console.log(calculateExercises(exampleArray, exampleTarget));