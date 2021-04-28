import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import colors from '../../../config/colors.json'
Icon.loadFont()

function Header({title, navigation, back, headerColor}: any) {
  return (
    <View
      style={[styles.header, {backgroundColor: headerColor || colors.white}]}>
      <View style={styles.container}>
        <View style={{flex: 0.3}}>
          {back ? (
            <Icon
              name="angle-left"
              size={30}
              color={headerColor ? colors.white : colors.primary}
              onPress={() => navigation.goBack()}
            />
          ) : (
            <Icon
              color={headerColor ? colors.white : colors.primary}
              name={'bars'}
              size={30}
              onPress={() => navigation.toggleDrawer()}
            />
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              {color: headerColor ? colors.white : colors.primary}
            ]}>
            {title}
          </Text>
        </View>
        <View style={{flex: 0.3}}>{null}</View>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.accent,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.4
  },
  title: {
    color: colors.primary,
    textAlign: 'center'
  }
})
