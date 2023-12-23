const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.static('public'));
const server = http.createServer(app);

const io = new Server(server)
let room

io.on('connection', (socket) => {
    console.log("user connected", socket.id)
    // setInterval(() => {
    //     socket.emit("message", "hello from server"+"-" +new Date().getTime())
    // }, 2000)
    // socket.emit("message", "welcome from server",socket.id)

    /** broadcast setup */
    socket.on("message",(data)=>{
        socket.broadcast.emit("broadcast",data)
    })

    /** listen to create grp */
    socket.on("create_grp",(roomId)=>{
        console.log("group created",roomId)
        room = roomId
        socket.join(roomId) // first member of the room
    })

    socket.on("join_grp",()=>{
        console.log(socket.id + "joined the room " + room)
        socket.join(room) // second member of the room
    })

    socket.on("grp message",(data)=>{
        socket.to(room).emit("server_grp_msg",data)
    })

    socket.on("leave_room",()=>{
        console.log(socket.id + "left the room " + room)
        socket.leave(room)
    })

    /** disconnect event */
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
    })

})

// app.get('/', (req, res) => {
//     res.send("hello world")
// })

server.listen(3000, () => {
    console.log("server started")
})