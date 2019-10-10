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
        socket.broadcast.to(data).emit('sendQuestion', data);

        // socket.emit('sendQuestion', data);
        _id = data;
        console.log(_id);
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
