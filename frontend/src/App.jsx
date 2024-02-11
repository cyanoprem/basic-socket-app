import { useEffect, useState } from "react"
import { io } from "socket.io-client"
const socket = io.connect('http://localhost:4000')

const App = () => {

  const [message, setMessage] = useState('')
  const [msgRec, setMsgRec] = useState('')

  const sendMessage = () => {
    console.log('Btn clicked')
    socket.emit('send_message', { message: message })
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMsgRec(data.message)
    })
  }, [socket])


  return <>
    <input type="text" placeholder="Enter Message" onChange={(e) => setMessage(e.target.value)} />
    <button onClick={sendMessage}>Send Message</button>
    <h1>Message Received: {msgRec}</h1>
  </>
}

export default App