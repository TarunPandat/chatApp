import React from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import colors from '../../config/colors'

interface loader {
  isLoading: boolean
  size?: 'small' | 'large'
  color?: string
}

function Loader({isLoading, size, color}: loader) {
  return isLoading ? (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  ) : null
}

export default Loader

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0
  }
})
