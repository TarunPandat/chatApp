import {combineReducers} from 'redux'
import Auth from './Auth'
import Chat from './Chat'

const root = combineReducers({
  Auth,
  Chat
})

export default root
