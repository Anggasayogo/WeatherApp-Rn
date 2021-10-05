import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  weatherRequest: ['data'],
  weatherSuccess: ['data'],
  weatherFailure: ['error'],

  getWeatherLetRequest: ['data'],
  getWeatherLetSuccess: ['data'],
  getWeatherLetFailure: ['error'],
})

export const WeatherTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  weatherModule: { data: null, fetching: false, error: null },
  weatherDay: { data: null, fetching: false, error: null }
})

/* ------------- Selectors ------------- */

export const WeatherSelectors = {
  getData: state => state.weather.weatherModule
}

/* ------------- Reducers ------------- */

export const weatherRequest = (state, { data }) =>
  state.merge({ ...state, weatherModule: { ...state.weatherModule, fetching: true, error: null } })
export const weatherSuccess = (state, { data }) =>
  state.merge({ ...state, weatherModule: { ...state.weatherModule, data, fetching: false, error: null } })
export const weatherFailure = (state, { error }) =>
  state.merge({ ...state, weatherModule: { ...state.weatherModule, fetching: false, error } })

export const getWeatherLetRequest = (state, { data }) =>
  state.merge({ ...state, weatherDay: { ...state.weatherDay, fetching: true, error: null } })
export const getWeatherLetSuccess = (state, { data }) =>
  state.merge({ ...state, weatherDay: { ...state.weatherDay, data, fetching: false, error: null } })
export const getWeatherLetFailure = (state, { error }) =>
  state.merge({ ...state, weatherDay: { ...state.weatherDay, fetching: false, error } })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.WEATHER_REQUEST]: weatherRequest,
  [Types.WEATHER_SUCCESS]: weatherSuccess,
  [Types.WEATHER_FAILURE]: weatherFailure,

  [Types.GET_WEATHER_LET_REQUEST]: getWeatherLetRequest,
  [Types.GET_WEATHER_LET_SUCCESS]: getWeatherLetSuccess,
  [Types.GET_WEATHER_LET_FAILURE]: getWeatherLetFailure,
})
