import diagnoses from '../../data/diagnoses';

import { TypeDiagnoses } from '../types';

const getDiagnoses = (): TypeDiagnoses[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};