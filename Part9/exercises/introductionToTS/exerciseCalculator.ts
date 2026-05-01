interface exerciseValues {
	periodLength: number;
	trainingDays: number;
	target: number;
	average: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
}

export const calculateExercises = (dailyHours: Array<number>, target: number): exerciseValues => {
	const periodLength: number = dailyHours.length;
	const trainingDays: number = dailyHours.filter(h => h > 0).length;
	let totalTrainingHours: number = 0;
	dailyHours.map(h => totalTrainingHours += Number(h));
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
		target: Number(target),
		average: average,
		success: success,
		rating: rating,
		ratingDescription: ratingDescription
	}
}

/*
try {
	//GET DATA FROM COMMAND LINE
	const inputTarget: number = Number(process.argv[2]);
	const inputArray: Array<string> = (process.argv.slice(3));
	let trainingDays: Array<number> = [];

	//CHECK IF inputTarget IS VALID
	if (isNaN(Number(inputTarget))) {
		throw new Error('invalid args detected in target!');
	}
	//CHECK INPUT ARRAY TO SEE IF THERE'S ANY NaN, AND FILL trainingDays ARRAY
	inputArray.map(n => {
		if ( !isNaN(Number(n)) ) {
			trainingDays = trainingDays.concat(Number(n));
			return null;
		}
		throw new Error('invalid args detected!');
	})

	//EXECUTE calculateExercises
	console.log(calculateExercises(trainingDays, inputTarget));
} catch (error) {
	console.log('Something bad happened: ', error);
}
*/
