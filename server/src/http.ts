import express from 'express';
import path from 'path'
import { createServer } from 'http'
import { Server } from 'socket.io'
import mongoose from 'mongoose'

const app = express();

const server = createServer(app);

mongoose.connect('mongodb://localhost/websocket', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.static(path.join(__dirname, '..', '..', 'front')))

const io = new Server(server)

io.on('connection', (socket) => {
    console.log(socket)
})

app.get('/', (req, res) => {
    return res.json({ message: 'Hellow' })
})

export { server, io }