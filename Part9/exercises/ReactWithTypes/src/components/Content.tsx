import Part from './Part';
import type { CoursePart } from '../types';

interface ContentProps {
    parts: CoursePart[]
};

const Content = (props: ContentProps) => {
    return (
        <div>
            <Part parts={props.parts} />
        </div>
    );
};

export default Content;