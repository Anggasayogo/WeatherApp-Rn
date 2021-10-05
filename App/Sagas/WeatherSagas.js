import { call, put } from 'redux-saga/effects'
import WeatherActions from '../Redux/WeatherRedux'
// import { WeatherSelectors } from '../Redux/WeatherRedux'

export function * getWeather (api, action) {
  const { data } = action
  const response = yield call(api.getWeathers, data)

  // success?
  if (response.ok) {
    yield put(WeatherActions.weatherSuccess(response.data))
  } else {
    yield put(WeatherActions.weatherFailure(response))
  }
}

export function * getWeatherbyDay (api, action) {
  const { data } = action
  const response = yield call(api.getLetWeather, data)

  // success?
  if (response.ok) {
    yield put(WeatherActions.getWeatherLetSuccess(response.data))
  } else {
    yield put(WeatherActions.getWeatherLetFailure(response))
  }
}
