// a library to wrap and simplify api calls
import apisauce from 'apisauce'
// default headers request
const headers = {
  'Content-Type': 'application/json'
}

const create = (baseURL = 'https://api.openweathermap.org/data/2.5/') => {
  const api_key = 'secret'
  const api = apisauce.create({
    baseURL,
    headers,
    timeout: 15000
  })

  const getRoot = () => api.get('')
  const getRate = () => api.get(`weather?q=tangerang&appid=`)
  const getUser = (username) => api.get('search/users', {q: username})
  const getWeathers = (keyword) => api.get(`weather?q=${keyword}&appid=${api_key}`)
  const getLetWeather = (keyword) => api.get(`forecast?q=${keyword}&appid=${api_key}`)

  return {
    getRoot,
    getRate,
    getUser,
    getWeathers,
    getLetWeather,
    api
  }
}

export default {
  create
}
