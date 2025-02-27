import express from 'express'
import { Server } from 'socket.io'
import ViteExpress from 'vite-express'
import { createServer } from 'http'
import path from 'path'

const __dirname = import.meta.dirname

const app = express()
const server = createServer(app).listen(3000, () => {
    console.log('HTTP server is listening at http://localhost:3000!')
})
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:3000'],
    },
})
io.listen(4000)

io.on('connection', (socket) => {
    console.log('a user connected, socket.id: ' + socket.id)
    io.to(socket.id).emit('hello')
    socket.on('disconnect', () => {
        console.log('a user disconnected, socket.id: ' + socket.id)
    })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../static')))
} else {
    ViteExpress.bind(app, server).then(() => {
        console.log('Vite started!')
    })
}
