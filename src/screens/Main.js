import React from 'react'
import PropTypes from 'prop-types'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AntDesign from 'react-native-vector-icons/AntDesign'

import Home from './Main/Home'
import Dashboard from './Main/Dashboard'
import AbsentList from './Main/AbsentList'
import Profile from './Main/Profile'

import { Colors, Fonts, Styles } from '../utils/'
import { isIphoneX } from '../utils/common'

class Main extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  render() {
    const MainTab = createBottomTabNavigator()

    return (
      <MainTab.Navigator
        tabBarOptions={{
          activeTintColor: Colors.Red,
          inactiveTintColor: Colors.Grey,
          showLabel: true,
          style: {
            minHeight: isIphoneX() ? 90 : 60,
            shadowColor: Colors.GreyDark,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.25,
            shadowRadius: 5,
            elevation: 10,
            zIndex: 1,
            borderTopWidth: 1,
            backgroundColor: Colors.White,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0
          },
          labelStyle: {
            fontFamily: Fonts.Roboto.Regular,
            top: -4
          }
        }}
        lazy={true}
        initialRouteName={'Home'}
      >
        <MainTab.Screen
          name={'Home'}
          component={Home}
          options={{
            tabBarLabel: 'Beranda',
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign name="home" size={28} color={focused ? Styles.BGTheme1 : Styles.Grey} />
            )
          }}
        />
        <MainTab.Screen
          name={'Dashboard'}
          component={Dashboard}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign name="dashboard" size={28} color={focused ? Styles.BGTheme1 : Colors.Grey} />
            )
          }}
        />
        <MainTab.Screen
          name={'AbsentList'}
          component={AbsentList}
          options={{
            tabBarLabel: 'Daftar Absen',
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign name="bells" size={28} color={focused ? Styles.BGTheme1 : Colors.Grey} />
            )
          }}
        />
        <MainTab.Screen
          name={'Profile'}
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused, color, size }) => (
              <AntDesign name="user" size={28} color={focused ? Styles.BGTheme1 : Colors.Grey} />
            )
          }}
        />
      </MainTab.Navigator>
    )
  }
}

export default Main
