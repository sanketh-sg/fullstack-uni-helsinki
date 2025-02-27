/* eslint-disable react/prop-types */
import { useState } from "react"

function Search({countries}) {

  const [search, setSearch] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(search)
    const country = countries.filter(country => country.name.common.toLowerCase() == search.toLowerCase()) 
      console.log(country)
    }

    const handleSearch =  (event) => {
        setSearch(event.target.value)
        // console.log(event.target.value)
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Find a country </label>
            <input type="text" value={search} onChange={handleSearch}/>
            <button type="submit">Search</button>
        </form>
    </div>
  )
}

export default Search