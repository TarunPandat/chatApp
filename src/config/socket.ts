import socket from 'socket.io-client'
import {setChats} from '../Redux/Chat'
import {userData} from '../utils/func'
const io = socket('localhost:4000')

io.on('connect', async () => {
  console.log('====================================')
  console.log('SOCKET CONNECTED')
  console.log('====================================')
  const {user} = await userData()

  io.emit('getChatList', user._id)
  io.on('receiveChatList', (chats: any) => {
    setChats(chats)
  })

  io.emit('join', user)

  io.on('receiveMsg', (data: any) => {
    console.warn(data)
  })

  io.on('msg', (msg: any) => {
    console.warn(msg)
  })
})

export default io
