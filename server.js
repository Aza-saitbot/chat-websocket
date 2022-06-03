const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require("socket.io")
const io = new Server(server, {
    cors: {
        origin: '*',
    }
})

app.use(express.json())


const rooms = new Map()

app.get('/rooms/:id', (req, res) => {

    const {id: roomId} = req.params
    const obj = rooms.has(roomId)
        ? {
            users: [...rooms.get(roomId).get('users').values()],
            messages: [...rooms.get(roomId).get('messages').values()]
        }
        : {users: [], messages: []}

    res.json(obj)
})

app.post('/rooms', (req, res) => {
    const {roomId } = req.body

    if (!rooms.has(roomId)) {
        rooms.set(
            roomId, new Map([
                ['users', new Map],
                ['messages', []]
            ])
        )
    }

    res.json(rooms)

})

io.on('connection', (socket) => {

    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        socket.join(roomId)
        rooms.get(roomId).get('users').set(socket.id, userName)
        const users = [...rooms.get(roomId).get('users').values()]
        socket.to(roomId).emit("ROOM:SET_USERS", users)
    })
    socket.on('ROOM:ADD_MESSAGE', ({userName, roomId, text}) => {

        const obj = {
            userName,
            text,
        }

        rooms.get(roomId).get('messages').push(obj)
        socket.broadcast.to(roomId).emit('ROOM:NEW_MESSAGE', obj)

    })

    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
            if (value.get('users').delete(socket.id)) {
                const users = [...value.get('users').values()]
                socket.broadcast.to(roomId).emit("ROOM:SET_USERS", users)
            }
        })
    })

})


server.listen(5000, (err) => {
    if (err) {
        throw Error(err)
    }
})