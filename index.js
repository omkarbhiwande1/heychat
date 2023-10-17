const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 4000

io.on('connection', socket => {
    const id = socket.handshake.query.currentChatIdentity
    socket.join(id)
    console.log("Connection established",id);
    socket.on('send-message', (data) => {
        console.log("message sent",data);

        socket.to(data.chatidentity).emit('recieve-message',data);
    })
    
})

app.use(express.json());
app.use(cookieParser());
app.use(cors());


if(process.env.NODE_ENV === "production"){
    // app.use(expres.static("./client/buil"));
    app.use(express.static(path.join(__dirname,"client/build")));
}

app.use(authRoutes)
app.use(userRoutes)
app.use(chatRoutes)

app.get("*",(req,res)=>{
    res.redirect("/");
});

http.listen(PORT);