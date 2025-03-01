/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import axios from 'axios'


function DisplayWeather({capital, lat, lon}) {
    // const api_key = import.meta.env.VITE_WEATHER_KEY

    const [weather, setWeather] = useState(null)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,rain,showers`


    useEffect(() => {
        axios
        .get(url)
        .then(response => {
            // console.log(response.data)
            setWeather(response.data)
        })
    }, [])

  return (
    <div>
        {weather ? 
        <div>
            <h4>Weather in {capital}</h4>
            <p>Temperature: {weather.current.temperature_2m}°C</p>
            <p>Precipitation: {weather.current.precipitation} mm</p>
            <p>Rain: {weather.current.rain} mm</p>
            {/* <p>Showers: {weather.current.showers} mm</p> */}
        </div> 
        : null}
    </div>
  )
}

export default DisplayWeather