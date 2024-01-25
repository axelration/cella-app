import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FlatList, Image, SafeAreaView, ScrollView, Text, View, RefreshControl, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { Header, Loading } from '../../components/'
import { Colors, Styles } from '../../utils/'
import attendanceService from '../../service/attendance'
import Snackbar from 'react-native-snackbar'

import RNFetchBlob from 'rn-fetch-blob';

class AbsentList extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      refreshing: false,
    }
  }

  getAttendanceList(loading = true) {
    const { user } = this.props
    if(loading) this.setState({loading: true})

    try {
      attendanceService.getAttendance(user.data.usr_id)
      .then((res) => {
        console.log(res)
        if (res.status == 200 || res.data.status == 'success') {
          let data = res.data.data
          this.setState({
            data: data
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

  handleDownload(type = '', loading = true) {
    const { user } = this.props
    if(loading) this.setState({loading: true})

    try {
      // attendanceService.getAttendance(user.data.usr_id, type)
      // .then((res) => {
      //   console.log(res)
      //   if (res.status == 200 || res.data.status == 'success') {
      //     let data = res.data.data
      //     this.checkPermission(data)
      //   } else {
      //     throw {message: 'Gagal terkoneksi ke server'};
      //   }
        if(loading) this.setState({loading: false})
      // })
    } catch (error) {
      if(loading) this.setState({loading: false})
      this.showSnackBar('Error: ' + error.message)
    }
    return Promise.resolve()
  }

  checkPermission = async (data) => {
    if (Platform.OS === 'ios') {
      downloadFile(data);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile(data);
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          this.showSnackBar('Error: Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log("++++"+err);
        this.showSnackBar('Error: Storage Permission Not Granted');
      }
    }
  };

  downloadFile = (fileUrl) => {
   
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = fileUrl;
    // Function to get extension of the file url
    let file_ext = this.getFileExtension(FILE_URL);
   
    file_ext = '.' + file_ext[0];
   
    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir+
          '/file_' + 
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'Downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,   
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        this.showSnackBar('File Downloaded Successfully.');
      });
  };

  getFileExtension = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ?
             /[^.]+$/.exec(fileUrl) : undefined;
  };

  _onRefresh() {
    this.setState({refreshing: true})
    setTimeout(() => {
      this.getAttendanceList(false).then(() => {
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
    this.getAttendanceList()
  }

  render() {
    const { user } = this.props
    const { data, loading } = this.state

    return (
      <SafeAreaView style={[Styles.Container, Styles.BgWhite]}>
        <View style={[Styles.ContainerGap3]}>
          <ScrollView stickyHeaderIndices={[0]}>
            <Header subtitle={'Daftar Absen'} />
            <ScrollView 
              stickyHeaderIndices={[0]}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
            >
              <View style={[Styles.H2]} />
              <View style={[Styles.Flex1, Styles.FlexRow, Styles.RTL, Styles.MarginRight3]}>
                <TouchableOpacity 
                style={[Styles.FlexCenter, Styles.Border1, Styles.BorderWhite, Styles.BorderRadius1, Styles.BgGreen, Styles.W32, Styles.H8, Styles.Padding1]} 
                onPress={() => this.handleDownload('1')}>
                  <Text style={[Styles.FontPrimaryMedium, Styles.TextWhite]}>{'Download Report'}</Text>
                </TouchableOpacity>
              </View>
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
                            <Text style={[Styles.FontPrimaryMedium, item.in === 'Tidak Ada' ? Styles.TextRed   : Styles.TextBlack]}>{item.in}</Text>
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
                            <Text style={[Styles.FontPrimaryMedium, item.out === 'Tidak Ada' ? Styles.TextRed : Styles.TextBlack]}>{item.out}</Text>
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
