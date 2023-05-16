import React from 'react'
import PropTypes from 'prop-types'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LogIn from './screens/Auth/LogIn'
import Main from './screens/Main'

class RootNavigator extends React.Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  render() {
    const Stack = createStackNavigator()
    const { isAuthenticated } = this.props

    return (
      <NavigationContainer>
        <Stack.Navigator mode="card" headerMode="none">
          {isAuthenticated ? (
            <>
              <Stack.Screen name="Main" component={Main} />
            </>
          ) : (
            <>
              <Stack.Screen name="LogIn" component={LogIn} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default RootNavigator
