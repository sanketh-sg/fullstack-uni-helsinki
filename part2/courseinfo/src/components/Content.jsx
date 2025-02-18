/* eslint-disable react/prop-types */
import Part from "./Part";
const Content = ({parts}) => {
    // console.log('Content props:', props.parts[0]);
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}


export default Content;
