/* eslint-disable react/prop-types */


export default function Person({name, number, id, handleDelete}) {


  return (
    <div>
        {name} {number} 
        <button onClick={() => handleDelete(id, name)}>Delete</button>
    </div>
  )
}
