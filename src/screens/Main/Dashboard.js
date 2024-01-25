import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert, SafeAreaView, ScrollView, Text, View, RefreshControl } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { Header, Loading } from '../../components/'
import { Colors, Styles } from '../../utils/'
import attendanceService from '../../service/attendance'
import Snackbar from 'react-native-snackbar'

class Dashboard extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {
        done: { number: '0', percentage: '0%' },
        yet: { number: '0', percentage: '0%' },
        late: { number: '0', percentage: '0%' },
        early: { number: '0', percentage: '0%' }
      },
      loading: false,
      refreshing: false,
    }
  }

  getDashboardData(loading = true) {
    if(loading) this.setState({loading: true})

    const { user } = this.props

    try {
      attendanceService.getAttendanceStat(user.data.usr_id)
      .then((res) => {
        console.log(res)
        if (res.status == 200 || res.data.status == 'success') {
          let data = res.data.data
          this.setState({
            data: {
              done: { number: data.total_checked, percentage: data.percentage_checked },
              yet: { number: data.total_not_checked, percentage: data.percentage_not_checked },
              late: { number: data.late_check_in, percentage: data.percentage_late },
              early: { number: data.early_check_out, percentage: data.percentage_early }
            }
          })
        } else {
          throw {message: 'Gagal terkoneksi ke server'};
        }
        if(loading) this.setState({loading: false})
      })
    } catch (error) {
      if(loading) this.setState({loading: false})
      this.showSnackBar('Error: ' + error.message)
    }

    return Promise.resolve()
  }

  _onRefresh() {
    this.setState({refreshing: true})
    setTimeout(() => {
      this.getDashboardData(false).then(() => {
        this.setState({refreshing: false})
      });
    }, 500)
  }

  showSnackBar(message = '') {
    return Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  componentDidMount() {
    this.getDashboardData()
  }

  render() {
    const { data, loading } = this.state

    return (
      <SafeAreaView style={[Styles.Container, Styles.BgWhite]}>
        <View style={[Styles.ContainerGap3]}>
          <ScrollView stickyHeaderIndices={[0]}>
            <Header subtitle={'Dashboard'} />
            <ScrollView
              stickyHeaderIndices={[0]}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
            >
              <View style={[Styles.Section, Styles.Padding6]}>
                <View style={[Styles.Flex1]}>
                  <View style={[Styles.FlexRow]}>
                    <View style={[Styles.Flex1]}>
                      <View style={[Styles.FlexRow, Styles.BgGreen, Styles.FlexAlignCenter, Styles.Padding2, Styles.BorderRadius2, Styles.BoxShadow]}>
                        <AntDesign name="adduser" size={36} color={Colors.White} />
                        <View style={[Styles.Flex1]}>
                          <Text style={[Styles.FontPrimaryRegular, Styles.TextWhite, Styles.TextRight]}>{'Sudah Absen'}</Text>
                          <Text style={[Styles.FontPrimaryLight, Styles.TextWhite, Styles.TextRight, Styles.Text6]}>{data.done.number}</Text>
                          <Text style={[Styles.FontPrimaryRegular, Styles.TextWhite, Styles.TextRight]}>{data.done.percentage}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={[Styles.W3]} />
                    <View style={[Styles.Flex1]}>
                      <View style={[Styles.FlexRow, Styles.BgRed, Styles.FlexAlignCenter, Styles.Padding2, Styles.BorderRadius2, Styles.BoxShadow]}>
                        <AntDesign name="deleteuser" size={36} color={Colors.White} />
                        <View style={[Styles.Flex1]}>
                          <Text style={[Styles.FontPrimaryRegular, Styles.TextWhite, Styles.TextRight]}>{'Belum Absen'}</Text>
                          <Text style={[Styles.FontPrimaryLight, Styles.TextWhite, Styles.TextRight, Styles.Text6]}>{data.yet.number}</Text>
                          <Text style={[Styles.FontPrimaryRegular, Styles.TextWhite, Styles.TextRight]}>{data.yet.percentage}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={[Styles.H3]} />
                <View style={[Styles.Flex1]}>
                  <View style={[Styles.FlexRow]}>
                    <View style={[Styles.Flex1]}>
                      <View style={[Styles.FlexRow, Styles.BgOrange, Styles.FlexAlignCenter, Styles.Padding2, Styles.BorderRadius2, Styles.BoxShadow]}>
                        <AntDesign name="exclamationcircleo" size={36} color={Colors.White} />
                        <View style={[Styles.Flex1]}>
                          <Text style={[Styles.FontPrimaryRegular, Styles.TextWhite, Styles.TextRight]}>{'Terlambat'}</Text>
                          <Text style={[Styles.FontPrimaryLight, Styles.TextWhite, Styles.TextRight, Styles.Text6]}>{data.late.number}</Text>
                          <Text style={[Styles.FontPrimaryRegular, Styles.TextWhite, Styles.TextRight]}>{data.late.percentage}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={[Styles.W3]} />
                    <View style={[Styles.Flex1]}>
                      <View style={[Styles.FlexRow, Styles.BgPink, Styles.FlexAlignCenter, Styles.Padding2, Styles.BorderRadius2, Styles.BoxShadow]}>
                        <AntDesign name="clockcircleo" size={36} color={Colors.White} />
                        <View style={[Styles.Flex1]}>
                          <Text style={[Styles.FontPrimaryRegular, Styles.TextWhite, Styles.TextRight]}>{'Pulang Awal'}</Text>
                          <Text style={[Styles.FontPrimaryLight, Styles.TextWhite, Styles.TextRight, Styles.Text6]}>{data.early.number}</Text>
                          <Text style={[Styles.FontPrimaryRegular, Styles.TextWhite, Styles.TextRight]}>{data.early.percentage}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

            </ScrollView>
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

export default connect(mapStateToProps)(Dashboard)
