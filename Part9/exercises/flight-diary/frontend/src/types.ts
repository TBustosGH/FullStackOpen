export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
//Weather type for form inputs
export type WeatherInput = Weather | '';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';
//Visibility type for form inputs
export type VisibilityInput = Visibility | '';

export interface DiaryEntry {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
};

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;