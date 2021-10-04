import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { StatusBar, Image, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Images from '../Images'

// Components
import Button from '../Components/Button'

// Styles
import styles from './Styles/LaunchScreenStyle'
import { apply } from '../Themes/OsmiProvider'

const LaunchScreen = props => {
  const _navigateExplore = useCallback(() => props.navigation.navigate("WelcomeScreen"), [])

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='light-content' backgroundColor={apply('gray-900')} />
      
    </SafeAreaView>
  )
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
