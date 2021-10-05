import React, { useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import WeatherAction from '../Redux/WeatherRedux'
import { StatusBar, Image, View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Images from '../Images'

// Components
import Button from '../Components/Button'
import NumberWeather from '../Components/NumberWeather'

// Styles
import styles from './Styles/LaunchScreenStyle'
import { apply } from '../Themes/OsmiProvider'

const LaunchScreen = props => {
  const { weather } = props
  const _navigateExplore = useCallback(() => props.navigation.navigate("WelcomeScreen"), [])
  const data = [
    {
      icon: Images.icCerahBerawan,
      celcius: 30,
      state: 'Morning'
    },
    {
      icon: Images.icCerahBerawan,
      celcius: 30,
      state: 'Afternoon'
    },
    {
      icon: Images.icHujan,
      celcius: 30,
      state: 'Evening'
    },
    {
      icon: Images.icHujanMalam,
      celcius: 30,
      state: 'Night'
    }
  ]

  useEffect(()=>{
    props.getWeather('jakarta')
  },[])

  const RenderState = (item) => {
    return(
      <View style={apply("mx-5")}>
        <Image source={item?.icon} style={apply("w-39 h-38")}/>
        <View style={apply('row items-center justify-center my-2')}>
          <Text style={apply('text-center font-semiBold text-xs')}>{item?.celcius}</Text>
          <View style={apply("ml-1 border border-black w-8 h-8 rounded rounded-full")}/>
        </View>
        <Text style={apply('font-regular text-xs text-center')}>{item?.state}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={apply('white')} />
      <View style={apply("bg-white p-5")}>
        <View style={apply("self-end row items-center")}>
          <Image source={Images.icBell} style={apply("w-24 h-24")}/>
          <Image source={Images.icProfile} style={apply("ml-3 w-32 h-32")} />
        </View>
        <View style={styles.wrraperCelciusState}>
          <View style={apply("row items-center flex")}>
            <NumberWeather number={weather?.data?.clouds?.all}/>
            <Text style={styles.textState}>| {weather?.data?.weather[0]?.description}</Text>
          </View>
          <Image source={{uri: `http://openweathermap.org/img/w/${weather?.data?.weather[0]?.icon}.png`}} style={apply("w-90 h-80 mr-3")}/>
        </View>
        <View style={apply('mt-3')}>
          <Text style={apply("text-xl font-semiBold my-2")}>Howdy, Angga Maulana</Text>
          <Text style={apply("text-xs font-regular")}>South Jakarta, Indonesia</Text>
        </View>
        <View style={apply("row items-center my-5")}>
          <View style={apply("mt-3 items-center")}>
            <Text style={apply("text-base font-semiBold")}>{weather?.data?.main?.humidity}%</Text>
            <Text style={apply('font-regular text-xs mt-1')}>Humidity</Text>
          </View>
          <View style={apply("mt-3 items-center flex")}>
            <Text style={apply("text-base font-semiBold")}>{weather?.data?.main?.feels_like}</Text>
            <Text style={apply('font-regular text-xs mt-1')}>Feels Like</Text>
          </View>
          <View style={apply("mt-3 items-center")}>
            <Text style={apply("text-base font-semiBold")}>{weather?.data?.main?.pressure} kmh</Text>
            <Text style={apply('font-regular text-xs mt-1')}>Wind Speed</Text>
          </View>
        </View>
      </View>
      <View style={apply("p-5")}>
        <View style={apply('items-center row mb-5')}>
          <Text style={apply('font-semiBold text-base')}>Today</Text>
          <Text style={apply('flex ml-3 font-regular text-sm')}>Tomorrow</Text>
          <Text onPress={_navigateExplore} style={apply('font-semiBold text-base text-primary')}>See All</Text>
        </View>
        <View style={apply("my-5")}>
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item})=> RenderState(item)}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={apply('items-center row my-5')}>
          <Text style={apply('font-semiBold text-base flex')}>Air Polutions</Text>
          <Text style={apply('font-semiBold text-base text-primary')}>Details</Text>
        </View>
        <View style={apply("row items-center")}>
          <Image source={Images.icMask} style={apply("w-32 h-40")}/>
          <View style={apply("mx-2")}>
            <View style={apply("row items-center")}>
              <Text style={apply("text-red-soft text-big font-regular")}>162</Text>
              <Text style={apply("px-2 text-sm font-regular")}>| Micro Dust / PM2.5</Text>
            </View>
            <Text style={apply("text-sm font-semiBold")}>Unhealthy</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({
  weather: state.weather.weatherModule
})

const mapDispatchToProps = dispatch => ({
  getWeather: (value) => dispatch(WeatherAction.weatherRequest(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
