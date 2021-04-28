import React from 'react'
import {Platform, StatusBar, View} from 'react-native'
import {Header} from '../components/Header'
import {RoutesName} from './routes.config'
import colors from './colors.json'

function Layout(props: any) {
  const {router} = props

  return router.name === RoutesName.Splash ? (
    <View>
      {router.layout.includes('header') && (
        <Header
          title={router.name}
          back={router?.back}
          {...props}
          headerColor={router?.headerColor}
        />
      )}
      <router.component {...props} />
    </View>
  ) : (
    <>
      {Platform.OS === 'ios' ? (
        <View
          style={{
            height: 40,
            backgroundColor: router?.headerColor || colors.primary
          }}>
          <StatusBar
            barStyle={
              router?.headerColor && router?.headerColor !== colors.white
                ? 'light-content'
                : 'dark-content'
            }
            backgroundColor={router?.headerColor || colors.primary}
          />
        </View>
      ) : (
        <StatusBar backgroundColor={router?.headerColor || colors.primary} />
      )}
      {router.layout.includes('header') && (
        <Header
          title={router.name}
          back={router?.back}
          headerColor={router?.headerColor}
          {...props}
        />
      )}
      <router.component {...props} />
    </>
  )
}

export default Layout
