import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */
import { StartupTypes } from '../Redux/StartupRedux'
import { StaticDataTypes } from '../Redux/StaticDataRedux'
import { WeatherTypes } from '../Redux/WeatherRedux'

/* ------------- Sagas ------------- */
import { startup } from './StartupSagas'
import { getRoot } from './StaticDataSagas'
import { getWeather, getWeatherbyDay } from './WeatherSagas'

/* ------------- API ------------- */
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */
export default function * root () {
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(WeatherTypes.WEATHER_REQUEST, getWeather, api),
    takeLatest(WeatherTypes.GET_WEATHER_LET_REQUEST, getWeatherbyDay, api),
    takeLatest(StaticDataTypes.GET_ROOT_REQUEST, getRoot, api)
  ])
}