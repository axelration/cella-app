import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'

import { setUser } from '../../stores/actions/userAction'
import { Loading } from '../../components/'
import { OS, Aspect, Styles } from '../../utils/'

class LogIn extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    data: {
      id: 'EMP 01223456789',
      name: 'Luna Maya',
      password: 'lunamaya',
      position: 'Operator',
      unit: 'SPBU Daan Mogot',
      date: '15 July 2020',
      status: 'Status',
      image: { uri: 'https://randomuser.me/api/portraits/women/90.jpg' }
    },
    loading: false
  }

  handleLogIn() {
    const { dispatch } = this.props

    this.setState({ loading: true })

    setTimeout(() => {
      this.setState({ loading: false })
      dispatch(setUser(this.state.data))
    }, 1000)
  }

  handleDataChange(label, value) {
    this.setState({ data: { ...this.state.data, [label]: value } })
  }

  render() {
    const { navigation } = this.props
    const { data, loading } = this.state

    return (
      <SafeAreaView style={[Styles.Container, Styles.BgWhite]}>
        <View style={[Styles.ContainerGap3]}>
          <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={30}>
            <View style={[Styles.Section, Styles.Padding6]}>
              <View style={[Styles.Flex1]}>
                <Image source={require('../../../assets/images/brand.png')} resizeMode="contain" style={[{ width: Aspect.Width / 2, height: Aspect.Width / 3 }]} />
                <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack, Styles.Text6]}>{'m-Kopertare'}</Text>
              </View>
            </View>
            <View style={[Styles.Section, Styles.Padding6]}>
              <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{'Masukkan ID Pekerja dan Password'}</Text>
              <View style={[Styles.H4]} />
              <View>
                <Text style={[Styles.FontPrimaryMedium, Styles.TextOrange]}>{'ID Pekerja *'}</Text>
                <View style={[Styles.H1]} />
                <TextInput
                  autoCapitalize="none"
                  autoFocus={true}
                  returnKeyType="next"
                  style={[Styles.PaddingHor3, Styles.Border1, Styles.BorderRadius1, Styles.BorderBlack, Styles.FontPrimaryRegular, Styles.H8]}
                  onSubmitEditing={() => { this.password.focus() }}
                  onChangeText={(text) => this.handleDataChange('id', text)}
                  value={data.id}
                />
                <View style={[Styles.H2]} />
                <Text style={[Styles.FontPrimaryMedium, Styles.TextOrange]}>{'Password *'}</Text>
                <View style={[Styles.H1]} />
                <TextInput
                  autoCapitalize={'none'}
                  returnKeyType="done"
                  secureTextEntry={true}
                  style={[Styles.PaddingHor3, Styles.Border1, Styles.BorderRadius1, Styles.BorderBlack, Styles.FontPrimaryRegular, Styles.H8]}
                  ref={(ref) => { this.password = ref }}
                  onSubmitEditing={() => { this.handleLogIn() }}
                  onChangeText={(text) => this.handleDataChange('password', text)}
                  value={data.password}
                />
                <View style={[Styles.H2]} />
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={[Styles.FontPrimaryRegular, Styles.TextBlue]}>{'Lupa Password'}</Text>
                </TouchableOpacity>
                <View style={[Styles.H8]} />
                <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderBlack, Styles.BorderRadius1, Styles.BgGreyLight, Styles.H8]} onPress={() => this.handleLogIn()}>
                  <Text style={[Styles.FontPrimaryMedium, Styles.TextBlack]}>{'LOG IN'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
        {loading ? (
          <Loading />
        ) : null}
      </SafeAreaView>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})

export default connect(mapDispatchToProps)(LogIn)
