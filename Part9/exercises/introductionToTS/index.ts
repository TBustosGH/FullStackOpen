import express from 'express';
const app = express();

import { calculatebmi } from './bmiCalculator';

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);

    if (!height || !weight) {
        res.send('No parameters found!');
    } else if (isNaN(height) || isNaN(weight)) {
        res.send('Invalid parameters found!');
    }

    const bmi: string = calculatebmi(height, weight);

    res.json({
        height: height,
        weight: weight,
        bmi: bmi
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});