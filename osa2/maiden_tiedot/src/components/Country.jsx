const MultipleCountries = ({ country, handleCountryClick }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={() => handleCountryClick(country.name.common)}>show</button>
    </div>
  )
}

const SingleCountry = ({ country, weather }) => {
  const getIconUrl = (iconCode) => `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    
  return (
    <div>
      <h2>{country.name.common}</h2>
      capital: {country.capital}<br />
      area: {country.area}<br /><br />
      <b>languages:</b>
      <ul>
        {Object.keys(country.languages).map(lang => 
          <li key={lang}>{country.languages[lang]}</li>
        )}
      </ul>
      <span style={{ fontSize: '5em' }}>{country.flag}</span>
      <h3>Weather in {country.capital}</h3>
      {weather && weather.main && weather.main.temp && (
      <div>
        <p>temperature {Math.round(weather.main.temp - 273.15)} °C</p>
        {weather.weather && weather.weather.length > 0 && (
          <div>
            <img
              src={getIconUrl(weather.weather[0].icon)}
              alt={weather.weather[0].description}
            />
            <p>wind {weather.wind.speed} m/s</p>
          </div>
        )}
      </div>
    )}
    </div>
  )
}

export { MultipleCountries, SingleCountry }
