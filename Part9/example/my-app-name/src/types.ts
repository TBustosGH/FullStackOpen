//course parts
interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
    description: string;
    kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: 'group';
}

interface CoursePartBackground extends CoursePartBase {
    description: string;
    backgroundMaterial: string;
    kind: 'background';
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

//notes
export interface Note {
    id: number;
    content: string;
}

export type NewNote = Omit<Note, 'id'>