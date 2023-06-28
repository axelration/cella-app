import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import 'react-native-gesture-handler'

import RootNavigator from './router'
import { isObjectExist } from './utils/common'

class App extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    service: PropTypes.object
  }

  render() {
    const { user, service } = this.props
    const isAuthenticated = isObjectExist(user.data)

    return (
      <RootNavigator isAuthenticated={isAuthenticated} />
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  service: state.service,
})

export default connect(mapStateToProps)(App)
