import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search'
import axios from 'axios'


function App() {
  
const[countries, setCountries] = useState([])

useEffect(() => {
  axios.
  get('https://studies.cs.helsinki.fi/restcountries/api/all')
  .then(response => {
    setCountries(response.data)
  })
}
, []) 
// console.log(countries)
  return (
   <Search countries={countries}/>
  )
}

export default App
