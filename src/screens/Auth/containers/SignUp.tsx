import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'
import React from 'react'
import {StyleSheet} from 'react-native'
import {
  View,
  Text,
  Button,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import {connect} from 'react-redux'
import Loader from '../../../components/Loader'
import {API} from '../../../config/api'
import colors from '../../../config/colors'
import {RoutesName} from '../../../config/routes.config'
import {post} from '../../../utils/apiServices'

function SignUp({navigation, login}: any) {
  const [state, setState] = React.useState<any>('')
  const [form, setForm] = React.useState<any>({
    isLoading: false,
    msg: '',
    error: false,
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  })
  const signUp = async () => {
    // let data = await post('https://jsonplaceholder.typicode.com/posts')
    // setState(data)
    const {firstName, lastName, email, password} = form
    const url = API.SIGN_UP
    const payload = {
      firstName,
      lastName,
      email,
      password
    }
    try {
      const res = await post(url, payload)
      if (res?.data?.error) {
        setForm({
          ...form,
          isLoading: false,
          error: true,
          msg: res?.data?.message
        })
      } else {
        await AsyncStorage.multiSet(
          [
            ['user', JSON.stringify(res?.data?.data?.user)],
            ['authToken', res?.data?.data?.authToken]
          ],
          () => {
            // navigation.navigate(RoutesName.Profile)
            setForm({...form, isLoading: false, error: false, msg: ''})

            login({
              login: true,
              authToken: res?.data?.data?.authToken,
              user: res?.data?.data?.user
            })
          }
        )
      }
    } catch (error) {
      setForm({...form, isLoading: false, error: true, msg: error?.message})
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
          <>
            <View style={styles.flex}>
              <Text style={styles.heading}>ChatApp</Text>
            </View>
            <View style={styles.flex}>
              <TextInput
                onChangeText={(e: any) => setForm({...form, firstName: e})}
                placeholder="First Name"
                keyboardAppearance="dark"
                style={styles.input}
                placeholderTextColor={colors.light}
                autoCapitalize="none"
              />
              <TextInput
                onChangeText={(e: any) => setForm({...form, lastName: e})}
                placeholder="Last Name"
                keyboardAppearance="dark"
                style={styles.input}
                placeholderTextColor={colors.light}
                autoCapitalize="none"
              />
              <TextInput
                onChangeText={(e: any) => setForm({...form, email: e})}
                placeholder="Email"
                keyboardAppearance="dark"
                style={styles.input}
                autoCompleteType="email"
                placeholderTextColor={colors.light}
                keyboardType="email-address"
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
              <TouchableOpacity onPress={signUp} style={{width: 200}}>
                <View style={styles.button}>
                  <Text style={{color: colors.primary}}>Sign Up</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
