import React, {Component} from 'react'
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native'
import {
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native-gesture-handler'
import {connect} from 'react-redux'
import {API} from '../../../config/api'
import colors from '../../../config/colors'
import {RoutesName} from '../../../config/routes.config'
import io from '../../../config/socket'
import {setChats} from '../../../Redux/Chat'
import {get, post} from '../../../utils/apiServices'

class ChatList extends Component {
  constructor(props: any) {
    super(props)

    this.state = {
      search: '',
      searchUsers: [],
      chats: []
    } as any
  }

  initSocket = () => {
    const {_id, email, setChat}: any = this.props

    io.emit('getChatList', _id)
    io.on('receiveChatList', (chats: any) => {
      setChat(chats)
    })
  }

  componentDidMount() {
    this.initSocket()
  }

  searchUsers = async (search: any) => {
    this.setState({search})
    const url = API.SEARCH_USERS
    const payload = {
      search
    }
    try {
      const res = await post(url, payload)

      if (res?.data?.data?.length) {
        this.setState({searchUsers: res?.data?.data})
      } else {
        this.setState({searchUsers: []})
      }
    } catch (error) {
      console.log('====================================')
      console.log('SEARCH USER ERROR: ', error)
      console.log('====================================')
    }
  }

  renderChats = ({item}: any) => {
    const {
      _id,
      navigation: {navigate}
    }: any = this.props
    let user = 'sender'
    if (item?.sender?._id === _id) {
      user = 'receiver'
    }

    let userData = item[user]

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigate(RoutesName.Chat, userData)}>
        <View style={styles.userContainer}>
          <Image
            source={{
              uri:
                'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
            }}
            style={styles.profileImg}
            resizeMode="cover"
          />
          <Text
            style={
              styles.userName
            }>{`${item[user]?.firstName} ${item[user]?.lastName}`}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const {search, searchUsers, chats}: any = this.state
    const {
      navigation: {navigate},
      chatList
    }: any = this.props

    return (
      <View style={[styles?.container]}>
        <View style={styles.searchWrapper}>
          <View style={[styles?.inputWrapper]}>
            <TextInput
              style={styles.input}
              placeholder="Search"
              value={search}
              onChangeText={this.searchUsers}
            />
          </View>
          {searchUsers?.length ? (
            <View style={styles.searchContainer}>
              <ScrollView>
                {searchUsers?.map((item: any, i: any) => {
                  return (
                    <TouchableOpacity
                      key={`${i}`}
                      activeOpacity={1}
                      onPress={() => navigate(RoutesName.Chat, item)}>
                      <View style={styles.userContainer}>
                        <Image
                          source={{
                            uri:
                              'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                          }}
                          style={styles.profileImg}
                          resizeMode="cover"
                        />
                        <Text style={styles.userName}>{item?.name}</Text>
                      </View>
                      <Text style={styles.userName}>{item?.email}</Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>
            </View>
          ) : null}
          <FlatList
            data={chatList}
            keyExtractor={(item: any, i: any) => i.toString()}
            renderItem={this.renderChats}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchWrapper: {
    margin: 10,
    position: 'relative'
  },
  searchContainer: {
    borderWidth: 0.5,
    borderColor: colors?.dark,
    padding: 10,
    marginVertical: 10,
    borderRadius: 30,
    position: 'absolute',
    backgroundColor: colors.white,
    top: 40,
    width: Dimensions.get('screen').width - 20,
    maxHeight: Dimensions.get('screen').height / 3,
    zIndex: 1
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: 30
  },
  input: {
    flex: 1
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    padding: 5
  },
  profileImg: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  userName: {
    marginLeft: 15,
    fontSize: 14
  }
})

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

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)
