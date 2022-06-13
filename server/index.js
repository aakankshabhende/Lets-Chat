const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const router = require('./router');


const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const app = express();
app.use(cors());
app.use(router);

const server = http.createServer(app);
//const io = socketio(server);

const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });


io.on('connection', (socket) =>{
    console.log('inside connect')

    socket.on('join', ({ name, room }, callback) => {
        console.log('inside join')
        const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    
    socket.join(user.room);

    socket.emit('message', {user:'admin', text:`Welcome ${user.name}!👋🏻 you landed in ${user.room}.`})
    socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} just joined ${user.room}!`})
  //  console.log('server broadcast done');

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    })

    socket.on('sendMessage', (message, callback) =>{
        console.log("inside server sen mess")
        const user = getUser(socket.id);
        io.to(user.room).emit('message', {user: user.name, text: message});
        callback();
    })

    socket.on('disconnect', () =>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', {user:'admin', text:`${user.name} just left!`})
        }
       
    })

});

server.listen(process.env.PORT || 5000, () => console.log(`Server has been started.`));