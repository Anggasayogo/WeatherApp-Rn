import React, { memo } from 'react'
// import PropTypes from 'prop-types'
import { View, Text } from 'react-native'

// Styles
import styles from './Styles/NumberWeatherStyle'
import { apply } from '../Themes/OsmiProvider'

const NumberWeather = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>30</Text>
      <View style={styles.circle}/>
    </View>
  )
}

// // Prop type warnings
// NumberWeather.propTypes = {
//   someProperty: PropTypes.object,
//   someSetting: PropTypes.bool.isRequired,
// }
//
// // Defaults for props
// NumberWeather.defaultProps = {
//   someSetting: false
// }

export default memo(NumberWeather)
