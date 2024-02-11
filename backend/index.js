const express = require('express')
const {mongoose, Schema, model } = require('mongoose')
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


const messageSchema = new Schema({
  message: String
})

const messageModel = model('messages', messageSchema)


app.get('/', async (req, res) => {
  const allMessages = await messageModel.find().exec()
  res.json(allMessages)
})


io.on("connection", (socket) => {
  console.log(`a user is connected ${socket.id}`)

  socket.on('send_message', async (data) => {
    const newMessage = new messageModel({
      message: data.message
    })
    await newMessage.save()

    const allMessages = await messageModel.find().exec()
    // console.log(allMessages)
    io.emit('receive_message', allMessages)
  })
})


server.listen(4000, async () => {
  await mongoose.connect('mongodb+srv://burztcrew:0NdsKMN4Ib8CG3oc@cluster0.36xw4ev.mongodb.net/chat-app-db?retryWrites=true&w=majority')
  console.log('Connected to Chat App DB & Listening on PORT 4000')
})


