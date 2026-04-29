const calculatebmi = (height: number, weight: number): string => {
    const imc = weight / Math.pow(height / 100, 2);

    if (imc < 18.5) {
        return 'Low (bad weight)';
    } else if (imc >= 18.5 && imc < 25) {
        return 'Normal (healthy weight)';
    } else if (imc >= 25 && imc < 30) {
        return 'High (bad weight)';
    } else if (imc >= 30) {
        return 'Really high (obesity)';
    }
    return 'You\'re not supossed to see this message!';
}


try {
    const height: number = Number(process.argv[2]);
    const weight: number = Number(process.argv[3]);

    if (isNaN(height) || isNaN(weight)) {
        throw new Error('invalid args detected! \nYou\'re supossed to enter your height (cm) and your weight (kg)');
    }

    console.log(calculatebmi(height, weight));
} catch (error) {
    console.log('Something bad happened: ', error);
}
