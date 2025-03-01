/* eslint-disable react/prop-types */
import { useState } from "react"
import DisplayCountry from "./DisplayCountry"


function Search({countries}) {

  const [search, setSearch] = useState('')
  const countriesList = countries.map(country => country.name.common)
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

    const handleSubmit = (event) => {
        event.preventDefault()
      // console.log(search)
      if(search === '') {
          return
      }
    const country = countries.filter(country => country.name.common.toLowerCase() == search.toLowerCase()) 
      // console.log(country)
      if(country.length > 0) {
          setSelectedCountry(country[0])
          setSearch('') //clear the search input
          setFilteredCountries([]) //clear the filtered countries
      } else {
          console.log('Country not found')  
      }

    }

    const handleSearch =  (event) => {
      const value = event.target.value
        setSearch(value)
        // console.log(event.target.value)
        if(value.trim() === '') {
            setFilteredCountries([])
        }
        else {
            const filteredList = countriesList.filter(country => country.toLowerCase().includes(value.toLowerCase()))
            setFilteredCountries(filteredList)
        }
    }

    const handleSelect = (country) => {
        setSearch(country) //set the search input to the selected country
        setFilteredCountries([]) //clear the filtered countries
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Find a country </label>
            <input type="text" value={search} onChange={handleSearch}/>
            {filteredCountries.length > 10 
                                        ? <p>Too many matches, specify another filter</p> 
                                        : filteredCountries.map((country, index) => <p key={index} onClick={() => handleSelect(country)}>{country}</p>)}
            <button type="submit">Search</button>
            {selectedCountry ? <DisplayCountry country={selectedCountry}/> : null}
        </form>
    </div>
  )
}

export default Search