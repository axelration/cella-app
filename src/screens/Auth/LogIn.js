import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'

// import { setUser } from '../../stores/actions/userAction'
import { setToken } from '../../stores/actions/serviceAction'
import { Loading } from '../../components/'
import { OS, Aspect, Styles } from '../../utils/'
import authService from '../../service/auth'
import DeviceInfo from 'react-native-device-info'
import Snackbar from 'react-native-snackbar'
import { setUser } from '../../stores/actions/userAction'

class LogIn extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        password: '',
      },
      loading: false
    }
  }

  handleLogIn() {
    const { dispatch } = this.props
    const { username, password } = this.state.data
    const deviceId = DeviceInfo.getUniqueId()

    this.setState({ loading: true })

    authService.login(username, password, deviceId)
    .then((res) => {
      console.log(res)
      if(res.status == 'failed' || res.code == 500 ) {
        this.setState({ loading: false })
        Snackbar.show({
          text: res.message,
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        dispatch(setToken(res.data.token))
        dispatch(setUser(res.data.user))
        this.setState({ loading: false })
      }
    })
    
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
              <View style={[Styles.Flex1, Styles.FlexCenter]}>
                <Image source={require('../../../assets/images/brand_cella_dark.png')} resizeMode="contain" style={[{ width: Aspect.Width / 2, height: Aspect.Width / 3 }]} />
              </View>
            </View>
            <View style={[Styles.Section, Styles.Padding6]}>
              <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{'Masukkan Username dan Password'}</Text>
              <View style={[Styles.H4]} />
              <View>
                <Text style={[Styles.FontPrimaryMedium, Styles.TextOrange]}>{'Username *'}</Text>
                <View style={[Styles.H1]} />
                <TextInput
                  autoCapitalize="none"
                  autoFocus={true}
                  returnKeyType="next"
                  style={[Styles.PaddingHor3, Styles.Border1, Styles.BorderRadius1, Styles.BorderBlack, Styles.FontPrimaryRegular, Styles.H8]}
                  onSubmitEditing={() => { this.password.focus() }}
                  onChangeText={(text) => this.handleDataChange('username', text)}
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
                />
                <View style={[Styles.H2]} />
                {/* <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                  <Text style={[Styles.FontPrimaryRegular, Styles.TextBlue]}>{'Lupa Password'}</Text>
                </TouchableOpacity> */}
                <View style={[Styles.H8]} />
                <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderBlack, Styles.BorderRadius2, Styles.BgTheme1, Styles.H9]} onPress={() => this.handleLogIn()}>
                  <Text style={[Styles.FontPrimaryMedium, Styles.TextWhite, Styles.Text3]}>{'LOG IN'}</Text>
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
