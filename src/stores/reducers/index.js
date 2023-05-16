import { combineReducers } from 'redux'
import languageReducer from './languageReducer'
import userReducer from './userReducer'

const reducer = combineReducers({
  language: languageReducer,
  user: userReducer
})

export default reducer
