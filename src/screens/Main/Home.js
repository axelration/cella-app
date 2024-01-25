import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, BackHandler } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import * as geolib from 'geolib';
import { Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import { PERMISSIONS, request } from 'react-native-permissions'
import JailMonkey from 'jail-monkey'

import { Header, Loading } from '../../components/'
import Snackbar from 'react-native-snackbar'
import { Aspect, Styles, Colors } from '../../utils/'
import attendanceService from '../../service/attendance'
import moment from 'moment/moment'
import { setUser } from '../../stores/actions/userAction'

class Home extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -6.238380,
        longitude: 106.852584,
        latitudeDelta: 0.005,
        longitudeDelta: 0.0075
      },
      radius: 500,
      self: {
        latitude: -6.238380,
        longitude: 106.852584
      },
      limit: {
        checkInEnable: '06:00:00',
        checkOutEnable: '13:00:00',
        checkInDisable: '09:30:00',
        checkOutDisable: '23:00:00'
      },
      loading: false,
      isUserInRadius: false,
      locationAccess: true,
    }
  }

  locationRequest() {
    const { dispatch } = this.props

    if (JailMonkey.trustFall()) {
      return Alert.alert('Error', 'Perangkat anda ditolak karena terdeteksi root/mock location', [{
        text: 'OK',
        onPress: () => {
          dispatch(setUser({}))
          BackHandler.exitApp()
        },
      }],
        { cancelable: false })
    }
    try {
      request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        })
      ).then(res => {
        if (res == "granted") {
          this.setState({locationAccess: true})
          this.watchLocation()
        } else {
          this.setState({locationAccess: false})
          this.showSnackBar("Tolong Izinkan Akses Lokasi")
          console.log("Location is not enabled");
        }
      });
    } catch (error) {
      this.showSnackBar('Akses lokasi ditolak')
    }
  }

  watchLocation() {
    Geolocation.watchPosition((position) => {
      this.setSelfLocation(position)
      this.checkPointInRadius()
    },
    (error) => {
      console.log('geolocation-error', error)
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
  }

  setSelfLocation(position) {
    this.setState({
      self: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
    })
  }

  checkPointInRadius() {
    var check = geolib.isPointWithinRadius(
      this.state.self,
      this.state.region,
      this.state.radius,
    );

    if (check) {
      this.setState({ isUserInRadius: true })
    } else {
      this.setState({ isUserInRadius: false })
    }
  }

  getPermitZone() {
    const { user } = this.props

    attendanceService.getGroupData(user.data.usr_id)
    .then((res) => {
      if (res.status == 200 || res.data.status == 'success') {
        let data = res.data.data
        this.setState({
          region: {
            ...this.state.region,
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
          },
          radius: data.radius,
          limit: {
            ...this.state.limit,
            checkInEnable: data.check_in_enable,
            checkOutEnable: data.check_out_enable,
            checkInDisable: data.check_in_disable,
            checkOutDisable: data.check_out_disable
          }
        })
      }

    })
  }

  handleCheck(type) {
    this.setState({loading: true})
    const { user } = this.props
    const { latitude, longitude } = this.state.self
    const { checkInEnable, checkOutEnable, checkInDisable, checkOutDisable } = this.state.limit
    const { isUserInRadius, locationAccess }  = this.state

    if (!locationAccess) {
      this.setState({loading: false})
      return this.showSnackBar('Tolong izinkan akses lokasi perangkat anda terlebih dahulu')
    }

    this.checkPointInRadius()

    if (!isUserInRadius) {
      this.setState({loading: false})
      return this.showSnackBar('Anda tidak sedang berada didalam Zona akses')
    }

    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    var time = moment().format('HH:mm:ss');
    if (
      ( type == '1' && (moment(time, 'HH:mm:ss').isBefore(moment(checkInEnable, 'HH:mm:ss')) || moment(time, 'HH:mm:ss').isAfter(moment(checkInDisable, 'HH:mm:ss'))) ) ||
      ( type == '2' && (moment(time, 'HH:mm:ss').isBefore(moment(checkOutEnable, 'HH:mm:ss')) || moment(time, 'HH:mm:ss').isAfter(moment(checkOutDisable, 'HH:mm:ss'))) ) 
    ) {
      this.setState({loading: false})
      return Alert.alert(
        'Gagal',
        `Anda diluar jam absen ${type == 1 ? 'datang' : 'pulang'}`
      );
    }

    var params = {
      usr_id: user.data.usr_id,
      type: type,
      check_time: date,
      latitude: latitude,
      longitude: longitude
    }

    attendanceService.setAttendance(params)
    .then((res) => {
      console.log(res)
      if(res.status == 'failed' || res.code == 500 ) {
        this.setState({ loading: false })
        Alert.alert('Gagal', res.message)
      } else {
        this.setState({ loading: false })
        Alert.alert('Sukses', 'Absen anda sudah tersimpan')
      }
    })
  }

  showSnackBar(message = '') {
    return Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  componentDidMount() {
    this.getPermitZone()
    this.locationRequest()
    this.checkPointInRadius()
  }

  componentWillUnmount() {
    Geolocation.clearWatch()
  }

  render() {
    const { user } = this.props
    const { region, loading, self } = this.state

    return (
      <SafeAreaView style={[Styles.Container, Styles.BgWhite]}>
        <View style={[Styles.ContainerGap3]}>
          <ScrollView stickyHeaderIndices={[0]}>
            <Header subtitle={'Beranda'} />
            <View style={[Styles.Section, Styles.Padding6]}>
              <View style={[Styles.Flex1]}>
                {user.data && user.data.group_name ? (
                  <Text style={[Styles.FontPrimaryRegular, Styles.TextBlack, Styles.Text2]}>{user.data.company_name + ' - ' + user.data.group_name}</Text>
                ) : null}
                <View style={[Styles.H4]} />
                <View style={[{ justifyContent: 'flex-end', alignItems: 'center', width: Aspect.Width - 60, height: Aspect.Width + 20 }]}>
                  <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={[{ ...StyleSheet.absoluteFillObject }]}
                    region={region}
                    showsUserLocation={true}
                    followsUserLocation={true}
                  >
                    <MapView.Circle
                      center={region}
                      radius={500}
                      strokeColor={Colors.MapStroke}
                      strokeWidth={2}
                      fillColor={Colors.MapFill}
                    />
                    <MapView.Marker
                      coordinate={self}
                    />
                  </MapView>
                </View>
                <View style={[Styles.H4]} />
                <View style={[Styles.FlexRow, Styles.FlexContentAround]}>
                  <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderWhite, Styles.BorderRadius1, Styles.BgGreen, Styles.W24, Styles.H8]} onPress={() => this.handleCheck('1')}>
                    <Text style={[Styles.FontPrimaryMedium, Styles.TextWhite]}>{'Datang'}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[Styles.FlexCenter, Styles.Border1, Styles.BorderWhite, Styles.BorderRadius1, Styles.BgTheme2, Styles.W24, Styles.H8]} onPress={() => this.handleCheck('2')}>
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
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
