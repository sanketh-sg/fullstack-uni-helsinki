/* eslint-disable react/prop-types */
const Part = (props) => {
    const { children } = props;
    const partDetails = children[1]; // The object with name and exercises
    const { name, exercises } = partDetails;
  
    return (
      <div>
        <h2>Part: {name}</h2>
        <p>Exercises: {exercises}</p>
      </div>
    );
  };
  
  export default Part;