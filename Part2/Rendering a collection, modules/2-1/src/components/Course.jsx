const Course = ({ courses }) => {
    //Function that returns every exercise of the course passed
    const ShowExercises = ({ course }) => {
        return (
            course.parts.map(part =>
                <p key={part.id}>{`${part.name} has ${part.exercises} exercises.`}</p>
            )
        )
    }
    //Function that returns the sum of the exercises of the course passed
    const ShowTotalExercises = ({ course }) => {
        let totalExercises = 0

        course.parts.map(part =>
            totalExercises += part.exercises
        )

        return(
            <p><strong>Total of {totalExercises} exercises</strong></p>
        )
    }
    //Function that returns the information of the list of courses passed
    const ShowCourses = ({courses}) => {
        return(
            courses.map(course => 
                <div key={course.id}>
                    <h2>{course.name}</h2>

                    <ShowExercises course = {course} />
                    <ShowTotalExercises course = {course} />
                </div>
            )
        )
    }


    return(
        <>
            <h1>Web development curriculum</h1>

            <ShowCourses courses={courses} />
        </>
    )
}


export default Course