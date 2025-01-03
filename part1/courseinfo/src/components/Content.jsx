/* eslint-disable react/prop-types */
import Part from "./Part";
const Content = (props) => {
    console.log('Content props:', props.parts[0]);
    return (
        <div>
            <Part>part={props.parts[0]}</Part>
            <Part>part={props.parts[1]}</Part>
            <Part>part={props.parts[2]}</Part>
        </div>
    )
}


export default Content;
