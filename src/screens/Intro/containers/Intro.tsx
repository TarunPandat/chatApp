import React, {Component} from 'react'
import {Alert, Button, Image, StyleSheet, Text, View} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import Icon from 'react-native-vector-icons/FontAwesome'
import App from '../../../../App'
import colors from '../../../config/colors.json'

const slides = [
  {
    key: 'one',
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../../../assets/images/a.png'),
    backgroundColor: '#59b2ab'
  },
  {
    key: 'two',
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../../../assets/images/b.png'),
    backgroundColor: '#febe29'
  },
  {
    key: 'three',
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../../../assets/images/c.png'),
    backgroundColor: '#22bcb5'
  }
]

export default class componentName extends Component<any> {
  state = {
    showRealApp: false
  }
  _renderItem = ({item}: any) => {
    return (
      <View>
        {/* <Text>{item.title}</Text> */}
        <Image
          source={item.image}
          style={{width: '100%', height: '100%', resizeMode: 'cover'}}
        />
      </View>
    )
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    // this.setState({showRealApp: true})
    this.props.navigation.replace('Home')
  }

  _renderNextButton = () => {
    return (
      <View>
        <Icon name="trash" color={colors.primary} size={24} />
      </View>
    )
  }
  _renderDoneButton = () => {
    return (
      <View>
        <Icon name="chevron-right" color={colors.primary} size={24} />
      </View>
    )
  }

  render() {
    if (this.state.showRealApp) {
      return <App />
    } else {
      return (
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
          renderDoneButton={this._renderDoneButton}
          //   renderNextButton={this._renderNextButton}
        />
      )
    }
  }
}
