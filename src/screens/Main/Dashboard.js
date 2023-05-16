import React from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { Header, Loading } from '../../components/'
import { Colors, Styles } from '../../utils/'

class Dashboard extends React.Component {
  state = {
    data: {
      done: { number: '179', percentage: '57%' },
      yet: { number: '136', percentage: '43%' },
      late: { number: '48', percentage: '15%' },
      early: { number: '0', percentage: '0%' }
    },
    loading: false
  }

  render() {
    const { data, loading } = this.state

    return (
      <SafeAreaView style={[Styles.Container, Styles.BgWhite]}>
        <View style={[Styles.ContainerGap3]}>
          <ScrollView>
            <Header subtitle={'Dashboard'} />
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
        </View>
        {loading ? (
          <Loading />
        ) : null}
      </SafeAreaView>
    )
  }
}

export default Dashboard
