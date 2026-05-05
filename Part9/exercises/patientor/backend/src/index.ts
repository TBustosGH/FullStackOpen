import express from 'express';
const app = express();
app.use(express.json());

//Routes
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

app.get('/api/ping/', (_req, res) => {
    res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});