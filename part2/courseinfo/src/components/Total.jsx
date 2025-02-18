/* eslint-disable react/prop-types */
const Total = (props) => {
    console.log('Total props:', props);
    const total = props.exercises[0].exercises + props.exercises[1].exercises + props.exercises[2].exercises;
    return (
        <div>
            <p>Number of exercises={total}</p>
        </div>
    )
}

export default Total;