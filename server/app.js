const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('Socket Bağlandı');

    socket.on('newQuestion', (data) => {
        socket.to(data.quiz_id).emit('sendQuestion', data);
    });

    socket.on('joinRoom', (data) => {
        socket.join(data);
        // socket.broadcast.to(data).emit('joinRoom','Deneme olsun bu');
    });

});

module.exports = {
    app,
    server
}
