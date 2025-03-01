/* eslint-disable react/prop-types */

import DisplayWeather from "./DisplayWeather"

function DisplayCountry({country}) {
    const handleClear = () => {
        window.location.reload()
    }
  return (
    <div>
        <h3>{country.name.common}</h3>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>

        <h4>Languages</h4> {/* Languages is an object so cannot use array func on it directly */}
        <ul>
            {Object.values(country.languages).map((language,index) => <li key={index}>{language}</li>)}
        </ul>{/* Object.values(obj) converts the values to an array */}
        <img src={country.flags.png} alt={country.name.common} width="300px"/>
        <br />
        <img src={country.coatOfArms.png} alt={country.name.common} width="100px" />
        <br />
        <DisplayWeather capital={country.capital} lat={country.latlng[0]} lon={country.latlng[1]}/>
        <button onClick={handleClear}>Clear</button>
    </div>
  )
}

export default DisplayCountry