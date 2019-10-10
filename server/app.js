const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var _id;

io.on('connection', socket => {
    console.log('Socket Bağlandı');

    socket.emit('newMessage', {
        text: 'WHAT'
    });

    socket.on('newQuestion', (data) => {
        console.log(data);
        // socket.broadcast.to(data.quiz_id).emit('sendQuestion', data.id);
        socket.to(data.quiz_id).emit('sendQuestion', data.id);
        // socket.emit('sendQuestion', data);
        _id = data;
    });

    socket.on('joinRoom', (data) => {
        socket.join(data);
        console.log('joinroom:' + data);
        // socket.broadcast.to(data).emit('joinRoom','Deneme olsun bu');
    });

});

module.exports = {
    app,
    server
}
