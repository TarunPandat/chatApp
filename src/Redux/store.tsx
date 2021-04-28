import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import logger from 'redux-logger'
import root from './root'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, root)

const store = createStore(persistedReducer, applyMiddleware(thunk, logger))

export const persistedStore = persistStore(store)

export default store
