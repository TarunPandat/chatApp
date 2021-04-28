import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {TextInput} from 'react-native-gesture-handler'
import {onChange} from 'react-native-reanimated'
import colors from '../../config/colors'

interface IForm {
  styles?: {
    container?: any
    label?: any
    formElement?: any
  }
  placeholderTextColor?: 'dark' | 'light' | 'primary'
  label?: string
  error?: string
  onChangeText: (item: any) => void
  placeholder?: string
  keyboardAppearance?: 'dark' | 'light' | 'default'
  props?: any
}

export const Input = ({
  styles = {},
  label,
  error,
  placeholderTextColor,
  placeholder,
  onChangeText,
  keyboardAppearance,
  ...props
}: IForm) => {
  let plTC = placeholderTextColor || 'light'
  let ka = keyboardAppearance || 'dark'
  return (
    <View style={{...styles?.container, ...Styles.container}}>
      {label && <Text style={{...Styles.label, ...styles.label}}>{label}</Text>}
      <TextInput
        style={{...Styles.input, ...styles?.formElement}}
        placeholderTextColor={colors[plTC]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardAppearance={ka}
        {...props}
      />
      <Text style={Styles.error}>{`${error ? `* ${error}` : ''}`}</Text>
    </View>
  )
}

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column'
  },
  input: {
    height: 20,
    borderBottomWidth: 1,
    borderColor: colors.light,
    width: '80%',
    color: colors.light,
    marginBottom: 20
  },
  label: {
    fontSize: 12,
    color: colors.accent
  },
  error: {
    fontSize: 10,
    color: colors.danger
  }
})
