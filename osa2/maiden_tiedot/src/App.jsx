import { useState, useEffect } from 'react'
import { MultipleCountries, SingleCountry } from './components/Country'
import Filter from './components/Filter'
import countryService from './services/countries'

const App = () => {
  const [showCountry, setShowCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY

  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase().includes(showCountry.toLowerCase()))

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      console.log(response.data)
      })
      .catch(error => {
        console.log('fail')
      })
  }, [])

  useEffect(() => {
    if (showCountry && countriesToShow.length === 1) {
      countryService
      .getWeather(countriesToShow[0].capital, apiKey)
      .then(response => {
        setWeather(response.data)
      console.log(response.data)
      })
      .catch(error => {
        console.log('fail')
      })
  }
  }, [showCountry, countriesToShow])

  const handleShowCountrieChange = (event) => {
    setShowCountry(event.target.value)
  }

  const handleCountryClick = (name) => {
    setShowCountry(name)
  }

  return (
    <div>
      <Filter value={showCountry} onChange={handleShowCountrieChange} /> 
    
      {showCountry && countriesToShow.length < 10 && countriesToShow.length > 1 ? (
          <div>
            {countriesToShow.map(country => (
              <MultipleCountries
                key={country.cca3}
                country={country}
                handleCountryClick={handleCountryClick}
              />
            ))}
          </div>
        ) : 
          null
      }

      {showCountry && countriesToShow.length >= 10 ? (
        <div>
          Too many matches, specify another filter
        </div>
        ) : 
          null}

      {countriesToShow.length === 1 ? (
        <div>
          {countriesToShow.map(country => (
            <SingleCountry
              key={country.cca3}
              country={country}
              weather={weather}
            />
          ))}
        </div>
        ) :
          null}

    </div>
  )
}

export default App
