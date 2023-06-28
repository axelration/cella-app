import { combineReducers } from 'redux'
import languageReducer from './languageReducer'
import userReducer from './userReducer'
import serviceReducer from './serviceReducer'

const reducer = combineReducers({
  language: languageReducer,
  user: userReducer,
  service: serviceReducer,
})

export default reducer
