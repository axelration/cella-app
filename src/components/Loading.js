import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, View } from 'react-native'

import { Colors, Styles } from '../utils/'

class Loading extends React.Component {
  static propTypes = {
    type: PropTypes.string
  }

  render() {
    return (
      <View style={[Styles.FlexCenter, Styles.PosAbsFull, Styles.BgBlackTranscluent]}>
        <ActivityIndicator
          color={Colors.White}
          size={'small'}
        />
      </View>
    )
  }
}

export default Loading
