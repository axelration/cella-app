import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, Text, View } from 'react-native'

import { Styles } from '../utils/'

class Header extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string
  }

  render() {
    const { user, title, subtitle } = this.props

    return (
      <View style={[Styles.Padding6, Styles.BgTheme2]}>
        <View style={[Styles.Flex1]}>
          <View style={[Styles.FlexRow]}>
            <View style={[Styles.Flex1, Styles.FlexContentCenter]}>
              <Text style={[Styles.FontPrimaryMedium, Styles.TextWhite, Styles.Text6]}>{title || 'Cella Works'}</Text>
              <View style={[Styles.H2]} />
              <Text style={[Styles.FontPrimaryRegular, Styles.TextWhite, Styles.Text4]}>{subtitle || ''}</Text>
            </View>
            <View style={[Styles.W12, Styles.FlexContentCenter]}>
              <Image source={require('../../assets/images/profile-pic.jpg')} resizeMode="contain" style={[Styles.W12, Styles.H12, Styles.BorderRadiusCella]} />
              <View style={[Styles.H1]} />
              {user.data && user.data.fullname ? (
                <Text style={[Styles.FontPrimaryMedium, Styles.TextWhite, Styles.TextCenter]}>{(user.data.fullname).split(' ')[0]}</Text>
              ) : null}
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Header)
