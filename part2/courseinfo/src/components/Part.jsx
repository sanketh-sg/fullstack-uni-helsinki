/* eslint-disable react/prop-types */
import { useState } from 'react';
const Part = ({part}) => {


  const { name, exercises } = part; // The object with name and exercises

  return (
      <div>
        <h2>Part: {name}</h2>
        <p>Exercises: {exercises}</p>
      </div>
      
    );
  };
  
  export default Part;