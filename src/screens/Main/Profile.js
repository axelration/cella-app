import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view'

import { setUser } from '../../stores/actions/userAction'
import { Header, Loading } from '../../components/'
import { Styles } from '../../utils/'

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
    loading: false
  }

  handleLogOut() {
    const { dispatch } = this.props

    this.setState({ loading: true })

    setTimeout(() => {
      this.setState({ loading: false })
      dispatch(setUser({}))
    }, 1000)
  }

  handleDataChange(label, value) {
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
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{'ID Pekerja'}</Text>
                      </View>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{': ' +  user.data.id}</Text>
                      </View>
                    </View>
                    <View style={[Styles.FlexRow]}>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{'Nama'}</Text>
                      </View>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{': ' +  user.data.name}</Text>
                      </View>
                    </View>
                    <View style={[Styles.FlexRow]}>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{'Jabatan'}</Text>
                      </View>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{': ' +  user.data.position}</Text>
                      </View>
                    </View>
                    <View style={[Styles.FlexRow]}>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{'Unit Kerja'}</Text>
                      </View>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{': ' +  user.data.unit}</Text>
                      </View>
                    </View>
                    <View style={[Styles.FlexRow]}>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{'Tanggal Masuk'}</Text>
                      </View>
                      <View style={[Styles.Flex1]}>
                        <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack]}>{': ' +  user.data.date}</Text>
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
                    returnKeyType="done"
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
                    returnKeyType="done"
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
                    onSubmitEditing={() => { this.handleLogOut() }}
                    value={data.passwordNewConfirmation}
                  />
                  <View style={[Styles.H4]} />
                  <View style={[Styles.Flex1, Styles.FlexCenter]}>
                    <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderBlack, Styles.BorderRadius1, Styles.BgGreyLight, Styles.W32, Styles.H8]}>
                      <Text style={[Styles.FontPrimaryMedium, Styles.TextBlack]}>{'GANTI PASSWORD'}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[Styles.H8]} />
                  <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderBlack, Styles.BorderRadius1, Styles.BgGreyLight, Styles.H8]} onPress={() => this.handleLogOut()}>
                    <Text style={[Styles.FontPrimaryMedium, Styles.TextBlack]}>{'LOG OUT'}</Text>
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
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
