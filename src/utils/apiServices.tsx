import AsyncStorage from '@react-native-async-storage/async-storage'
import Axios from 'axios'
import {userData} from './func'

export const get = async (url: string, config?: any) => {
  const {authToken} = await userData()
  let defaultConfig = {
    headers: {
      Authorization: authToken
    },
    ...config
  }

  return Axios.get(url, defaultConfig)
}

export const post = async (url: string, payload: any, config?: any) => {
  const {authToken} = await userData()
  let defaultConfig = {
    headers: {
      Authorization: authToken
    },
    ...config
  }

  return Axios.post(url, payload, defaultConfig)
}

export const put = async (url: string, payload: any, config?: any) => {
  const {authToken} = await userData()
  let defaultConfig = {
    headers: {
      Authorization: authToken
    },
    ...config
  }

  return Axios.put(url, payload, defaultConfig)
}

export const del = async (url: string, config?: any) => {
  const {authToken} = await userData()
  let defaultConfig = {
    headers: {
      Authorization: authToken
    },
    ...config
  }

  return Axios.delete(url, defaultConfig)
}
