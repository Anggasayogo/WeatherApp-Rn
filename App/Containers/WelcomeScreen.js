import React, { useLayoutEffect, useContext } from 'react'
import { connect } from 'react-redux'
import { StatusBar, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { NavigationContext } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Timeline from 'react-native-timeline-flatlist'

import Images from '../Images'

// Styles
import styles from './Styles/WelcomeScreenStyle'
import { apply } from '../Themes/OsmiProvider'

const WelcomeScreen = props => {
  const { navigation } = props
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
      headerLeft: () => (
        <TouchableOpacity onPress={()=> navigation.goBack()} style={apply('mx-5')}>
          <Image source={Images.icArrowLeft} style={apply("w-10 h-20")}/>
        </TouchableOpacity>
      ),
      headerTitle: <HeaderTitle />,
      headerTitleContainerStyle: {
        left: 160,
      },
    })
  }, [navigation])

  const DetailWeather = (item) => {
    return (
      <View style={apply("row items-center")}>
        <View style={apply("w-75")}>
          <Image source={item?.icon} style={apply("w-39 h-38")}/>
          <Text style={apply("text-sm font-regular")}>{item?.state}</Text>
        </View>
        <View style={[apply("flex p-3"), item.color]}>
          <Text>26</Text>
          <Text>Winds light and chance of rain 80%</Text>
        </View>
      </View>
    )
  }
  
  return (
    <SafeAreaView style={apply("flex bg-gray-soft")}>
      <StatusBar barStyle='dark-content' backgroundColor={apply('white')} />
      <ScrollView>
        <Text style={apply("text-base font-semiBold text-black mb-5 mt-3 px-4")}>December 22</Text>
        <Timeline
          data={data}
          showTime={false}
          renderDetail={DetailWeather}
        />
        <Text style={apply("text-base font-semiBold text-black my-5 px-4")}>Today Details</Text>
        <View style={apply("items-center justify-center")}>
          <View style={apply("row items-center")}>
            <View style={apply("row items-center px-4 my-2 mx-3")}>
              <Image source={Images.icWind} style={apply("w-32 h-32")}/>
              <View style={apply("mx-2")}>
                <Text style={apply("text-base font-semiBold")}>E 8 kmh</Text>
                <Text style={apply("text-xs font-regular")}>Wind</Text>
              </View>
            </View>
            <View style={apply("row items-center px-4 my-2 mx-3")}>
              <Image source={Images.icHumidity} style={apply("w-32 h-32")}/>
              <View style={apply("mx-2")}>
                <Text style={apply("text-base font-semiBold")}>61%</Text>
                <Text style={apply("text-xs font-regular")}>Humidity</Text>
              </View>
            </View>
          </View>
          <View style={apply("row items-center")}>
            <View style={apply("row items-center px-4 my-2 mx-3")}>
              <Image source={Images.icUv} style={apply("w-32 h-32")}/>
              <View style={apply("mx-2")}>
                <Text style={apply("text-base font-semiBold")}>11</Text>
                <Text style={apply("text-xs font-regular")}>Uv Index</Text>
              </View>
            </View>
            <View style={apply("row items-center px-4 my-2 mx-3")}>
              <Image source={Images.icPesure} style={apply("w-24 h-24")}/>
              <View style={apply("mx-2")}>
                <Text style={apply("text-base font-semiBold")}>1008 hPa</Text>
                <Text style={apply("text-xs font-regular")}>Pressure</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const HeaderTitle = () => {
  const navigation = useContext(NavigationContext)
  return(
    <Text style={apply('text-base font-semiBold')}>Today</Text>
  )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
