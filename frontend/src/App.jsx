import { useEffect, useState } from "react"
import { io } from "socket.io-client"
const socket = io.connect('http://localhost:4000')



// const App = () => {

//   const [message, setMessage] = useState('')
//   const [msgRec, setMsgRec] = useState('')

//   const sendMessage = () => {
//     console.log('Btn clicked')
//     socket.emit('send_message', { message: message })
//   }

//   useEffect(() => {
//     socket.on('receive_message', (data) => {
//       setMsgRec(data.message)
//     })
//   }, [socket])


//   return <>
//     <input type="text" placeholder="Enter Message" onChange={(e) => setMessage(e.target.value)} />
//     <button onClick={sendMessage}>Send Message</button>
//     <h1>Message Received: {msgRec}</h1>
//   </>
// }

// export default App


const App = () => {

  const [msgs, setMsgs] = useState([])
  const [newMsg, setNewMsg] = useState('')

  useEffect(() => {
    const fetchAllMsgs = async () => {
      const response = await fetch('http://localhost:4000/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setMsgs(data)
    }
    fetchAllMsgs()
  }, [])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMsgs(data)
      // console.log(data)
    })
  }, [socket])





  return <>
    <input type="text" placeholder="Enter Message" onChange={(e) => setNewMsg(e.target.value)} value={newMsg} />

    <button onClick={() => {
      socket.emit('send_message', { message: newMsg })
      // setMsgs([...msgs, newMsg])
      setNewMsg('')
    }}>
      Send Message
    </button>

    <ul>
      {
        msgs.map((msg) => <li>{msg.message}</li>)
      }
    </ul>
  </>

}

export default App