type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';

type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    Visibility: Visibility;
    comment?: string;
};

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;