interface ContentProps {
    parts: object
};

const Content = (props: ContentProps) => {
    return (
        <div>
            <p>
                {props.parts[0].name} {props.parts[0].exerciseCount}
            </p>
            <p>
                {props.parts[1].name} {props.parts[1].exerciseCount}
            </p>
            <p>
                {props.parts[2].name} {props.parts[2].exerciseCount}
            </p>
        </div>
    );
};

export default Content;