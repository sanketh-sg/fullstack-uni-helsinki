/* eslint-disable react/prop-types */


function Search({ searchName, handleName, persons }) {
    
    const showResult = 
        persons.find(person => person.name === searchName) 
        ? persons.find(person => person.name === searchName).number 
        : 'Not found'

  return (
    <>
        <h2>Search</h2>
        <br/>
        <div>
            Find me <input value={searchName} onChange={handleName}/>
            {/* <button type='submit' onClick={handleSearch}>Search</button> */}
        </div>
        <br/>
        <div>
        { showResult }
        </div>
    </>


  )
}

export default Search