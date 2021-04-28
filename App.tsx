import 'react-native-gesture-handler'
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Navigation from './src/config/Navigation'
import {BlogProvider} from './src/components/Context/BlogContext'
import {Provider} from 'react-redux'
import store, {persistedStore} from './src/Redux/store'
import {PersistGate} from 'redux-persist/integration/react'
import './src/config/socket'

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <BlogProvider>
            <Navigation />
          </BlogProvider>
        </PersistGate>
      </Provider>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    margin: 150
  }
})
