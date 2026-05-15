import axios from 'axios';
import type { Diagnoses } from '../types';

import { apiBaseUrl } from '../constants';

const getAllDiagnoses = async () => {
    const { data } = await axios.get<Diagnoses>(
        `${apiBaseUrl}/diagnoses`
    );
    return data;
};

export default {
    getAllDiagnoses
};