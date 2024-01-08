import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
  return axios.get(baseUrl)
}

const getWeather = (capital, apiKey) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}`
  return axios.get(url)
}


export default { getAll, getWeather }