import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, {Component} from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import {
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import Loader from '../../../components/Loader'
import colors from '../../../config/colors'
import {config} from '../../../config/config'
import {RoutesName} from '../../../config/routes.config'
import {userData} from '../../../utils/func'

const SignIn = (props: any) => {
  const {navigation, login} = props

  const [form, setForm] = React.useState({
    email: '',
    password: '',
    isLoading: false,
    error: false,
    msg: ''
  })

  const signIn = async () => {
    setForm({...form, isLoading: true})

    const {email, password} = form
    const url = `${config.apiUrl}auth/signin`

    const payload = {
      email,
      password
    }
    try {
      const res = await axios.post(url, payload)

      if (res?.data?.error) {
        setForm({
          ...form,
          error: true,
          msg: res?.data.message,
          isLoading: false
        })
      } else {
        try {
          await AsyncStorage.multiSet(
            [
              ['user', JSON.stringify(res?.data?.data?.user)],
              ['authToken', res?.data?.data?.authToken]
            ],
            () => {
              // navigation.navigate(RoutesName.Profile)
              setForm({...form, isLoading: false})
              login({
                login: true,
                authToken: res?.data?.data?.authToken,
                user: res?.data?.data?.user
              })
            }
          )
        } catch (error) {
          setForm({...form, error: true, msg: error.message, isLoading: false})
        }
      }
    } catch (error) {
      console.log(error)

      setForm({...form, error: true, msg: error.message, isLoading: false})
    }
  }

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          style={styles.inner}>
          <View style={styles.flex}>
            <Text style={styles.heading}>ChatApp</Text>
          </View>
          <View style={styles.flex}>
            <TextInput
              onChangeText={(e: any) => setForm({...form, email: e})}
              placeholder="Email"
              keyboardAppearance="dark"
              style={styles.input}
              autoCompleteType="email"
              placeholderTextColor={colors.light}
              autoCapitalize="none"
            />
            <TextInput
              onChangeText={(e: any) => setForm({...form, password: e})}
              placeholder="Password"
              keyboardAppearance="dark"
              style={styles.input}
              autoCompleteType="password"
              placeholderTextColor={colors.light}
              secureTextEntry
              autoCapitalize="none"
            />
            <Text
              style={{
                color: colors.danger,
                marginTop: 20
              }}>
              {form.msg}
            </Text>
            <TouchableOpacity onPress={signIn} style={{width: 200}}>
              <View style={styles.button}>
                <Text style={{color: colors.primary}}>Sign In</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate(RoutesName.SignUp)}>
              <Text
                style={{
                  color: colors.light,
                  marginTop: 20,
                  textDecorationLine: 'underline'
                }}>
                create account. Sign-up
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <Loader isLoading={form.isLoading} size="large" color={colors.light} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary
  },
  inner: {
    height: '100%'
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: 20,
    borderBottomWidth: 1,
    borderColor: colors.light,
    width: '80%',
    color: colors.light,
    marginBottom: 20
  },
  heading: {
    fontSize: 30,
    color: colors.light,
    fontWeight: '800',
    fontStyle: 'italic'
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5
  }
})

const mapStateToProps = ({Auth}: any) => {
  return {
    auth: Auth
  }
}

const mapDispatchToProps = {
  login: (data: {login: boolean; authToken: string; user: any}) => ({
    type: 'login',
    payload: data
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
