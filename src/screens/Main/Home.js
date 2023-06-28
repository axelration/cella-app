import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import { Header, Loading } from '../../components/'
import { Aspect, Styles, Colors } from '../../utils/'

class Home extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  state = {
    region: {
      latitude: -6.238380,
      longitude: 106.852584,
      latitudeDelta: 0.005,
      longitudeDelta: 0.0075
    },
    self: {
      latitude: -6.238380,
      longitude: 106.852584
    },
    loading: false
  }

  render() {
    const { user } = this.props
    const { region, loading, self } = this.state

    return (
      <SafeAreaView style={[Styles.Container, Styles.BgWhite]}>
        <View style={[Styles.ContainerGap3]}>
          <ScrollView>
            <Header subtitle={'Beranda'} />
            <View style={[Styles.Section, Styles.Padding6]}>
              <View style={[Styles.Flex1]}>
                {user.data && user.data.name ? (
                  <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack, Styles.Text4]}>{user.data.unit}</Text>
                ) : null}
                <View style={[Styles.H4]} />
                <View style={[{ justifyContent: 'flex-end', alignItems: 'center', width: Aspect.Width - 60, height: Aspect.Width + 60 }]}>
                  <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={[{ ...StyleSheet.absoluteFillObject }]}
                    region={region}
                  >
                    <MapView.Circle
                      center = {region}
                      radius = { 500 }
                      strokeColor = { Colors.MapStroke }
                      strokeWidth = { 2 }
                      fillColor = { Colors.MapFill }
                    />
                    <MapView.Marker
                      coordinate={self}
                    />
                  </MapView>
                </View>
                <View style={[Styles.H4]} />
                <View style={[Styles.FlexRow, Styles.FlexContentAround]}>
                  <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderWhite, Styles.BorderRadius1, Styles.BgGreen, Styles.W24, Styles.H8]}>
                    <Text style={[Styles.FontPrimaryMedium, Styles.TextWhite]}>{'Datang'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderWhite, Styles.BorderRadius1, Styles.BgTheme2, Styles.W24, Styles.H8]}>
                    <Text style={[Styles.FontPrimaryMedium, Styles.TextWhite]}>{'Pulang'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
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

export default connect(mapStateToProps)(Home)
