/* eslint-disable react/prop-types */


function AddNew({ newName, newNumber, handlePerson, handleNumber, addPerson }) {


    return (
    <>
        <h2>Add a new</h2>
        <br/>
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handlePerson}/>                
            </div>
            <br/>
            <div>
                number: <input  value={newNumber} onChange={handleNumber}/>
            </div>
            <div>
                <button type='submit'>Add</button>
            </div>
        </form>
    </>
  )
}

export default AddNew