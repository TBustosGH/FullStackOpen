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

console.log(calculatebmi(174, 80));