import React, {Component} from 'react'
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  View
} from 'react-native'
import {
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'
import colors from '../../../config/colors'
import io from '../../../config/socket'
import {setChats} from '../../../Redux/Chat'
import {userData} from '../../../utils/func'

Ionicons.loadFont()

const {width} = Dimensions.get('screen')

class Chat extends Component {
  constructor(props: any) {
    super(props)

    this.state = {
      message: '',
      messages: [],
      isFocused: false
    }
  }

  socketIO = () => {
    io.on('msg', (msg: any) => {
      console.warn(msg)
    })
  }

  componentDidMount() {
    this.socketIO()
  }

  sendMessage = async () => {
    const {
      user: {_id}
    } = await userData()
    const {message}: any = this.state
    const user: any = this.props?.route?.params
    const {setChat}: any = this.props

    io.emit('sendMsg', message)
    // io.emit('sendMsg', {sender: _id, receiver: user._id, message})

    this.setState({
      message: '',
      messages: [...this.state.messages, {id: 1, message}]
    })

    // io.on('receiveMsg', (data: any) => {
    //   this.setState({messages: [...this.state.messages, data]})
    // })
  }

  render() {
    const {message, messages, isFocused}: any = this.state

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            activeOpacity={1}
            style={{height: '100%', width}}
            onPress={Keyboard.dismiss}>
            <FlatList
              data={messages}
              keyExtractor={(item: any, i: any) => i.toString()}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      alignItems: item?.id === 1 ? 'flex-end' : 'flex-start',
                      marginHorizontal: 10,
                      marginVertical: 2
                    }}>
                    <View
                      style={{
                        backgroundColor: colors.primary,
                        borderRadius: 10,
                        padding: 5,
                        maxWidth: width / 1.4
                      }}
                      s>
                      <Text style={{color: colors.white}}>{item?.message}</Text>
                    </View>
                  </View>
                )
              }}
            />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView behavior="padding">
          <View
            style={{
              backgroundColor: colors.dark,
              paddingHorizontal: 20,
              paddingVertical: 10,
              paddingBottom: isFocused ? 95 : 20,
              maxHeight: 150,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <TextInput
              ref="msgBox"
              multiline
              placeholder="Type a message..."
              value={message}
              style={{color: colors.white, flex: 1}}
              placeholderTextColor={colors.white}
              onFocus={() => this.setState({isFocused: true})}
              onBlur={() => this.setState({isFocused: false})}
              autoFocus
              onChangeText={(message: any) => this.setState({message})}
            />
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={this.sendMessage}
              disabled={!message.trim()?.length}>
              <Ionicons name="paper-plane" color={colors.white} size={20} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = ({
  Auth: {
    user: {_id, email}
  },
  Chat: {chatList}
}: any) => {
  return {
    _id,
    email,
    chatList
  }
}

const mapDispatchToProps = {
  setChat: (payload: any) => setChats(payload)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
