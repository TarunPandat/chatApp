import React from 'react'
import {StyleSheet, Button, View, Animated, ScrollView} from 'react-native'
import {RoutesName} from '../../../config/routes.config'
import colors from '../../../config/colors.json'
import {userData} from '../../../utils/func'
import {connect, useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

function SplashScreen({navigation}: any) {
  const dispatch = useDispatch()
  const tryS = async () => {
    const introComplete = await AsyncStorage.getItem('intro')
    await new Promise((res) => setTimeout(res, 2000))
    if (introComplete) {
      navigation.replace(RoutesName.Home)
    } else {
      navigation.replace(RoutesName?.Intro)
      await AsyncStorage.setItem('intro', 'true')
    }
  }

  const AuthChecker = () => {
    React.useEffect(() => {
      tryS()
    }, [dispatch])
  }

  AuthChecker()

  const animatedValue = React.useRef<any>(new Animated.Value(0)).current
  const animate = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false
    }).start()
  }

  React.useEffect(() => {
    animate()
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View ref={animatedValue}>
        <Animated.Text
          ref={animatedValue}
          style={[
            styles.title,
            {
              marginBottom: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 50, 0]
              }),
              fontSize: animatedValue.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [20, 50, 20]
              })
            }
          ]}>
          Splash Screen
        </Animated.Text>
      </Animated.View>
    </View>
  )
}

const mapStateToProps = ({Auth}: any) => {
  return {
    auth: Auth
  }
}

const mapDispatchToProps = {
  login: (data: any) => ({type: 'login', payload: data}),

  introComplete: () => ({type: 'introDone'})
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    height: '100%'
  },
  title: {
    fontSize: 20,
    color: colors.white
  }
})
