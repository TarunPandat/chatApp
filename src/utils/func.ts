import AsyncStorage from '@react-native-async-storage/async-storage'
export const userData = async () => {
  let data: any = {}
  data.authToken = await AsyncStorage.getItem('authToken')
  data.user = JSON.parse((await AsyncStorage.getItem('user')) || '{}')

  return data
}
