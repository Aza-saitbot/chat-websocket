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


const rooms=new Map()

app.get('/users',(req,res)=>{

    res.json(rooms)
})

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
});


server.listen(5000,(err)=>{
    if (err){
        throw Error(err)
    }
    console.log('Server started on 5000 port')
})