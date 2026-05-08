import type { CoursePart } from '../types';

interface PartProps {
    parts: CoursePart[];
}

const Part = (props: PartProps) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled descriminated union member: ${JSON.stringify(value)}`
        );
    };

    return (
        <div>
            {props.parts.map(part => {
                switch (part.kind) {
                    case 'basic':
                        return (
                            <div key={part.name}>
                                <h3>{part.name} {part.exerciseCount}</h3>
                                <p>{part.description}</p>
                            </div>
                        );
                    case 'group':
                        return (
                            <div key={part.name}>
                                <h3>{part.name} {part.exerciseCount}</h3>
                                <p>project exercises {part.groupProjectCount}</p>
                            </div>
                        );
                    case 'background':
                        return (
                            <div key={part.name}>
                                <h3>{part.name} {part.exerciseCount}</h3>
                                <p>{part.description}</p>
                                <p>submit to {part.backgroundMaterials}</p>
                            </div>
                        );
                    case 'special':
                        return (
                            <div key={part.name} >
                                <h3>{part.name} {part.exerciseCount}</h3>
                                <p>{part.description}</p>
                                <p>required skills: {part.requirements.join(', ')}</p>
                            </div>
                        );
                    default:
                        return assertNever(part);
                }
            })
            }
        </div>
    )
};

export default Part;