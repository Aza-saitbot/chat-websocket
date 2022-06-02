const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
    cors: {
        origin: '*',
    }
})

app.use(express.json())

const rooms=new Map()

app.get('/rooms',(req,res)=>{

    res.json(rooms)
})

app.post('/rooms',(req,res)=>{
const {roomId,userName}=req.body

    if (!rooms.has(roomId)){
        rooms.set(
            roomId, new Map([
                ['users',new Map],
                ['messages',[]]
            ])
        )
    }

    res.json(rooms)
    
})

io.on('connection', (socket) => {
    
    socket.on('ROOM:JOIN',(data)=>{
        console.log('data',data)
    })
    console.log('a user connected',socket.id);
});


server.listen(5000,(err)=>{
    if (err){
        throw Error(err)
    }
    console.log('Server started on 5000 port')
})