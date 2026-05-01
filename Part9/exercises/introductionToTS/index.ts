import express from 'express';
const app = express();
app.use(express.json());

import { calculatebmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

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
app.post('/exercises', (req, res) => {
    //gather variables
    if (!req.body) {
        return res.status(400).json({ error: 'no body found' });
    }

    const { daily_exercises, target } = req.body;

    //check variables
    if (!target || isNaN(Number(target))) {
        return res.status(400).json({ error: 'missing or invalid arg: target' });
    } else if (!daily_exercises || !Array.isArray(daily_exercises)) {
        return res.status(400).json({ error: 'missing or invalid arg: daily_exercises' });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    daily_exercises.map((n: any) => {
        if (isNaN(Number(n))) {
            return res.status(400).json({ error: `invalid arg in daily_exercises, ${n}` });
        }
        return null
    })

    //calculate and send results
    const result = calculateExercises(daily_exercises, target);
    return res.send({ result });
})
const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});