import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'
import Snackbar from 'react-native-snackbar'

import { setUser } from '../../stores/actions/userAction'
import { setToken } from '../../stores/actions/serviceAction'
import { Header, Loading } from '../../components/'
import { Styles } from '../../utils/index'
import profileService from '../../service/profile'

class Profile extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  state = {
    data: {
      password: '',
      passwordNew: '',
      passwordNewConfirmation: ''
    },
    loading: false,
    errorPwd: false,
  }

  handleLogOut() {
    const { dispatch } = this.props

    this.setState({ loading: true })
    dispatch(setUser({}))
    dispatch(setToken({}))
    this.setState({ loading: false })
  }

  handleChangePassword() {
    const { user } = this.props
    const { password, passwordNew, passwordNewConfirmation, errorPwd } = this.state.data

    if (password == '') {
      return this.showSnackBar('Password lama tidak boleh kosong')
    } else if(passwordNew != passwordNewConfirmation) {
      this.setState({ errorPwd: true })
      return this.showSnackBar('Konfirmasi password baru tidak sesuai')
    } else if(passwordNew.length < 8) {
      return this.showSnackBar('Password baru minimal 8 karakter')
    }

    if(!errorPwd) {
      profileService.changePassword(user.data.usr_id, password, passwordNew, passwordNewConfirmation)
      .then((res) => {
        console.log(res)
        this.setState({ loading: false })

        if(res.status == 'success' || res.status == '200') {
          this.setState({ 
            loading: false, 
            data: {
              password: '',
              passwordNew: '',
              passwordNewConfirmation: '',
            } 
          })
        }

        return this.showSnackBar(res.message ?? res.data.message);
      })
    }
    
  }

  showSnackBar(message = '') {
    return Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  handleDataChange(label, value) {
    switch (label) {
      case 'passwordNewConfirmation':
        if(value != this.state.data.passwordNew) {
          this.setState({errorPwd: true})
        } else {
          this.setState({errorPwd: false})
        }
        break;
      case 'passwordNew':
        if(value != this.state.data.passwordNewConfirmation) {
          this.setState({errorPwd: true})
        } else {
          this.setState({errorPwd: false})
        }
        break;
    }
    
    this.setState({ data: { ...this.state.data, [label]: value } })
  }

  render() {
    const { user } = this.props
    const { data, loading } = this.state

    return (
      <SafeAreaView style={[Styles.Container, Styles.BgWhite]}>
        <View style={[Styles.ContainerGap3]}>
          <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={60}>
            <Header subtitle={'Profile'} />
            <View style={[Styles.Section, Styles.PaddingHor6]}>
              <View style={[Styles.Flex1]}>
                {user.data ? (
                  <View style={[Styles.Flex1]}>
                    <View style={[Styles.H2]} />
                    <View style={[Styles.FlexRow]}>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{'Username'}</Text>
                      </View>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{': ' +  user.data.username}</Text>
                      </View>
                    </View>
                    <View style={[Styles.FlexRow]}>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{'Nama Lengkap'}</Text>
                      </View>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{': ' +  user.data.fullname}</Text>
                      </View>
                    </View>
                    <View style={[Styles.FlexRow]}>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{'Nama Perusahaan'}</Text>
                      </View>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{': ' +  user.data.company_name}</Text>
                      </View>
                    </View>
                    <View style={[Styles.FlexRow]}>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{'Lokasi Kerja'}</Text>
                      </View>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{': ' +  user.data.group_name}</Text>
                      </View>
                    </View>
                    <View style={[Styles.FlexRow]}>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{'Email'}</Text>
                      </View>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{': ' +  user.data.email}</Text>
                      </View>
                    </View>
                    <View style={[Styles.FlexRow]}>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{'Status'}</Text>
                      </View>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{': ' +  user.data.status}</Text>
                      </View>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
            <View style={[Styles.Section, Styles.Padding6]}>
              <View style={[Styles.Flex1]}>
                <Text style={[Styles.FontPrimaryMedium, Styles.TextBlack]}>{'Ganti Password'}</Text>
                <View style={[Styles.H4]} />
                <View>
                  <Text style={[Styles.FontPrimaryMedium, Styles.TextOrange]}>{'Password Lama *'}</Text>
                  <View style={[Styles.H1]} />
                  <TextInput
                    autoCapitalize={'none'}
                    returnKeyType="next"
                    secureTextEntry={true}
                    style={[Styles.PaddingHor3, Styles.Border1, Styles.BorderRadius1, Styles.BorderBlack, Styles.FontPrimaryRegular, Styles.H8]}
                    ref={(ref) => { this.password = ref }}
                    onChangeText={(text) => this.handleDataChange('password', text)}
                    onSubmitEditing={() => { this.passwordNew.focus() }}
                    value={data.password}
                  />
                  <View style={[Styles.H2]} />
                  <Text style={[Styles.FontPrimaryMedium, Styles.TextOrange]}>{'Password Baru *'}</Text>
                  <View style={[Styles.H1]} />
                  <TextInput
                    autoCapitalize={'none'}
                    returnKeyType="next"
                    secureTextEntry={true}
                    style={[Styles.PaddingHor3, Styles.Border1, Styles.BorderRadius1, Styles.BorderBlack, Styles.FontPrimaryRegular, Styles.H8]}
                    ref={(ref) => { this.passwordNew = ref }}
                    onChangeText={(text) => this.handleDataChange('passwordNew', text)}
                    onSubmitEditing={() => { this.passwordNewConfirmation.focus() }}
                    value={data.passwordNew}
                  />
                  <View style={[Styles.H2]} />
                  <Text style={[Styles.FontPrimaryMedium, Styles.TextOrange]}>{'Ulangi Password Baru'}</Text>
                  <View style={[Styles.H1]} />
                  <TextInput
                    autoCapitalize={'none'}
                    returnKeyType="done"
                    secureTextEntry={true}
                    style={[Styles.PaddingHor3, Styles.Border1, Styles.BorderRadius1, Styles.BorderBlack, Styles.FontPrimaryRegular, Styles.H8]}
                    ref={(ref) => { this.passwordNewConfirmation = ref }}
                    onChangeText={(text) => this.handleDataChange('passwordNewConfirmation', text)}
                    onSubmitEditing={() => { this.handleChangePassword() }}
                    value={data.passwordNewConfirmation}
                  />
                  {this.state.errorPwd ? (
                    <Text style={[Styles.FontPrimaryMedium, Styles.TextRed]}>{'* Konfirmasi Password Baru tidak sesuai'}</Text>
                  ) : null}
                  <View style={[Styles.H4]} />
                  <View style={[Styles.Flex1, Styles.FlexCenter]}>
                    <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderGrey, Styles.BorderRadius2, Styles.BgGreyLight, Styles.W32, Styles.H8]} onPress={() => this.handleChangePassword()}>
                      <Text style={[Styles.FontPrimaryMedium, Styles.TextTheme1]}>{'GANTI PASSWORD'}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[Styles.H8]} />
                  <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderBlack, Styles.BorderRadius1, Styles.BgTheme1, Styles.H8]} onPress={() => this.handleLogOut()}>
                    <Text style={[Styles.FontPrimaryMedium, Styles.TextWhite]}>{'LOG OUT'}</Text>
                  </TouchableOpacity>
                </View>
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

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
