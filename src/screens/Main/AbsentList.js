import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FlatList, Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { Header, Loading } from '../../components/'
import { Colors, Styles } from '../../utils/'

class AbsentList extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  state = {
    data: [{
      id: '1',
      date: '1 February',
      in: { type: 'mobile', time: '08.05 AM' },
      out: { type: 'mobile', time: '05.35 PM' },
      status: { type: 'On Time', color: 'Green' },
      total: { time: '8H 30M', color: 'Blue' }
    }, {
      id: '2',
      date: '2 February',
      in: { type: 'mobile', time: '09.00 AM' },
      out: { type: 'fingerprint', time: '07.00 PM' },
      status: { type: 'Late', color: 'Red' },
      total: { time: '9H 0M', color: 'Blue' }
    }, {
      id: '3',
      date: '3 February',
      in: { type: '', time: 'Not Recorded' },
      out: { type: '', time: 'Not Recorded' },
      status: { type: 'Not Record', color: 'Pink' },
      total: { time: 'Null', color: 'Grey' }
    }, {
      id: '4',
      date: '4 February',
      in: { type: 'mobile', time: '08.05 AM' },
      out: { type: 'fingerprint', time: '05.35 PM' },
      status: { type: 'On Time', color: 'Green' },
      total: { time: '8H 30M', color: 'Blue' }
    }],
    loading: false
  }

  render() {
    const { user } = this.props
    const { data, loading } = this.state

    return (
      <SafeAreaView style={[Styles.Container, Styles.BgWhite]}>
        <View style={[Styles.ContainerGap3]}>
          <ScrollView>
            <Header subtitle={'Daftar Absen'} />
            <FlatList
              contentContainerStyle={[Styles.Flex1, Styles.PaddingVer2, Styles.PaddingHor3, Styles.BgGreyLight]}
              data={data}
              renderItem={({ item }) => {
                return (
                  <View style={[Styles.Flex1, Styles.MarginVer1, Styles.Padding3, Styles.BorderRadius1, Styles.BoxShadow, Styles.BgWhite]} key={item.id}>
                    <Text style={[Styles.FontPrimaryMedium, Styles.TextBlack]}>{item.date}</Text>
                    <View style={[Styles.H1]} />
                    <View style={[Styles.FlexRow]}>
                      <View style={[Styles.Flex1]}>
                        <View style={[Styles.FlexRow]}>
                          <AntDesign name="login" size={16} color={Colors.Green} />
                          <View style={[Styles.W1]} />
                          <Text style={[Styles.FontPrimaryRegular, Styles.TextGrey]}>{'Check In'}</Text>
                          <View style={[Styles.W1]} />
                          {item.in.type ? (
                            <Text style={[Styles.FontPrimaryRegular, Styles.TextGrey]}>
                              [<Text style={[Styles.FontPrimaryRegular, Styles.TextBlue]}>{item.in.type}</Text>]
                            </Text>
                          ) : null}
                        </View>
                        <View style={[Styles.H1]} />
                        <View style={[Styles.FlexRow]}>
                          <View style={[{ width: 22.5 }]} />
                          <Text style={[Styles.FontPrimaryMedium, item.in.time === 'Not Recorded' ? Styles.TextRed   : Styles.TextBlack]}>{item.in.time}</Text>
                        </View>
                      </View>
                      <View style={[Styles.Flex1]}>
                        <View style={[Styles.FlexRow]}>
                          <AntDesign name="logout" size={16} color={Colors.Red} />
                          <View style={[Styles.W1]} />
                          <Text style={[Styles.FontPrimaryRegular, Styles.TextGrey]}>{'Check Out'}</Text>
                          <View style={[Styles.W1]} />
                          {item.out.type ? (
                            <Text style={[Styles.FontPrimaryRegular, Styles.TextGrey]}>
                              [<Text style={[Styles.FontPrimaryRegular, Styles.TextBlue]}>{item.out.type}</Text>]
                            </Text>
                          ) : null}
                        </View>
                        <View style={[Styles.H1]} />
                        <View style={[Styles.FlexRow]}>
                          <View style={[{ width: 22.5 }]} />
                          <Text style={[Styles.FontPrimaryMedium, item.in.time === 'Not Recorded' ? Styles.TextRed : Styles.TextBlack]}>{item.in.time}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={[Styles.H2]} />
                    <View style={[Styles.BorderTop1, Styles.BorderGreyLight]}>
                      <View style={[Styles.H2]} />
                      <View style={[Styles.FlexRow, Styles.FlexContentBetween]}>
                        <View style={[Styles.Padding1, Styles.PaddingHor2, Styles.BorderRadius1, Styles['Bg' + item.status.color]]}>
                          <Text style={[Styles.FontPrimaryRegular, Styles.TextWhite, Styles.Text1]}>{item.status.type}</Text>
                        </View>
                        <View style={[Styles.Padding1, Styles.PaddingHor2, Styles.BorderRadius1, Styles['Bg' + item.total.color]]}>
                          <Text style={[Styles.FontPrimaryRegular, Styles.TextWhite, Styles.Text1]}>{item.total.time}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )
              }}
              keyExtractor={(item) => item.id}
            />
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

export default connect(mapStateToProps)(AbsentList)
