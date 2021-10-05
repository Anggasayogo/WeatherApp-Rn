import React, { useLayoutEffect, useContext } from 'react'
import { connect } from 'react-redux'
import WeatherAction from '../Redux/WeatherRedux'
import { StatusBar, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { NavigationContext } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Timeline from 'react-native-timeline-flatlist'
import Moment from 'moment'
import Images from '../Images'

// Styles
import styles from './Styles/WelcomeScreenStyle'
import { apply } from '../Themes/OsmiProvider'

const WelcomeScreen = props => {
  const { navigation, getWeatherbyDay, weatherday } = props
  const data = [
    {
      icon: Images.icCerahBerawan,
      celcius: 30,
      state: 'Morning',
      color: apply("bg-blue-soft")
    },
    {
      icon: Images.icCerahBerawan,
      celcius: 30,
      state: 'Afternoon',
      color: apply("bg-yellow-soft")
    },
    {
      icon: Images.icHujan,
      celcius: 30,
      state: 'Evening',
      color: apply("bg-red-smooth")
    },
    {
      icon: Images.icHujanMalam,
      celcius: 30,
      state: 'Night',
      color: apply("bg-green-soft")
    }
  ]

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: apply('border-0 shadow-none bg-white'),
      headerTitle: <HeaderTitle />,
      headerTitleAlign: 'center'
    })
    getWeatherbyDay('jakarta')
  }, [navigation])

  const DetailWeather = (item) => {
    return (
      <View style={apply("row items-center mx-3")}>
        <View style={apply("w-75")}>
          <Text style={apply("text-xs")}>{Moment(item?.dt_txt).format('DD MMMM YYYY hh:mm')}</Text>
          <Image source={{uri: `http://openweathermap.org/img/w/${item?.weather[0]?.icon}.png`}} style={apply("w-50 h-50")}/>
          <Text style={apply("text-sm font-medium")}>{item?.weather[0]?.description}</Text>
        </View>
        <View style={[apply("flex p-3"), item.color]}>
          <View style={apply("row items-center my-2")}>
            <Image source={Images.icWind} style={apply("w-32 h-32")}/>
            <View style={apply("mx-2")}>
              <Text style={apply("text-base font-semiBold")}>{item?.wind?.speed} kmh</Text>
              <Text style={apply("text-xs font-regular")}>Wind Speed</Text>
            </View>
          </View>
          <View style={apply("row items-center my-2")}>
            <Image source={Images.icHumidity} style={apply("w-32 h-32")}/>
            <View style={apply("mx-2")}>
              <Text style={apply("text-base font-semiBold")}>{item?.main?.humidity}%</Text>
              <Text style={apply("text-xs font-regular")}>Humidity</Text>
            </View>
          </View>
          <View style={apply("row items-center my-2")}>
            <Image source={Images.icUv} style={apply("w-32 h-32")}/>
            <View style={apply("mx-2")}>
              <Text style={apply("text-base font-semiBold")}>{item?.main?.feels_like}</Text>
              <Text style={apply("text-xs font-regular")}>Feels Like</Text>
            </View>
          </View>
          <View style={apply("row items-center my-2")}>
            <Image source={Images.icPesure} style={apply("w-24 h-24 w-full")}/>
            <View style={apply("mx-2")}>
              <Text style={apply("text-base font-semiBold")}>{item?.main?.pressure} hPa</Text>
              <Text style={apply("text-xs font-regular")}>Pressure</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
  
  return (
    <SafeAreaView style={apply("flex bg-gray-soft")}>
      <StatusBar barStyle='dark-content' backgroundColor={apply('white')} />
        <Text style={apply("text-base font-semiBold text-black mb-5 mt-3 px-4")}>Daily forecast for 7 days</Text>
        <Timeline
          data={weatherday?.data?.list}
          showTime={false}
          renderDetail={DetailWeather}
          options={{
            showsVerticalScrollIndicator: false
          }}
        />
    </SafeAreaView>
  )
}

const HeaderTitle = () => {
  const navigation = useContext(NavigationContext)
  return(
    <Text style={apply('text-base font-semiBold align-center text-center')}>Daily forecast</Text>
  )
}

const mapStateToProps = state => ({
  weatherday: state.weather.weatherDay
})

const mapDispatchToProps = dispatch => ({
  getWeatherbyDay: (value) => dispatch(WeatherAction.getWeatherLetRequest(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
