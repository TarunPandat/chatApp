import {config} from './config'

const baseUrl = config.apiUrl

export const API = {
  SEARCH_USERS: `${baseUrl}user/search-user`,
  SIGN_UP: `${baseUrl}auth/signup`
}
