const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')

const app = express()
app.use(cors({
  origin: '*',
  methods: '*',
  allowedHeaders: '*',
  exposedHeaders: '*'
}))

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    exposedHeaders: '*'
  }
})

io.on("connection", (socket) => {
  console.log(`a user is connected ${socket.id}`)

  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data)
  })
})


server.listen(4000, () => console.log('Listening on PORT 4000'))


