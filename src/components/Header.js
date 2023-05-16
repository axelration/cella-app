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
      <View style={[Styles.Padding6, Styles.BgWhite]}>
        <View style={[Styles.Flex1]}>
          <View style={[Styles.FlexRow]}>
            <View style={[Styles.Flex1, Styles.FlexContentCenter]}>
              <Text style={[Styles.FontPrimaryMedium, Styles.TextBlack, Styles.Text6]}>{title || 'm-Kopertare'}</Text>
              <View style={[Styles.H2]} />
              <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack, Styles.Text4]}>{subtitle || ''}</Text>
            </View>
            <View style={[Styles.W12, Styles.FlexContentCenter]}>
              <Image source={{ uri: 'https://randomuser.me/api/portraits/women/90.jpg' }} resizeMode="contain" style={[Styles.W12, Styles.H12, Styles.BorderRadius6]} />
              <View style={[Styles.H1]} />
              {user.data && user.data.name ? (
                <Text style={[Styles.FontPrimaryMedium, Styles.TextOrange, Styles.TextCenter]}>{(user.data.name).split(' ')[0]}</Text>
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
