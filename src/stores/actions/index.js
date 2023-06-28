import languageAction from './languageAction'
import userAction from './userAction'
import serviceAction from './serviceAction'

const actions = {
  ...languageAction,
  ...userAction,
  ...serviceAction
}

export default actions
