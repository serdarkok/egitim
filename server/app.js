const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Guests = require('../models/Guests');
const cookie = require('js-cookie');
// import Guests from '../models/Guests';

io.on('connection', socket => {
    console.log('Socket Bağlandı');
    console.log(socket.id);
    console.log('Bağlı Toplam kullanıcılar: ' + io.engine.clientsCount);
    console.log(socket.disconnected);
    socket.on('newQuestion', (data) => {
        socket.to(data.quiz_id).emit('sendQuestion', data);
    }, {'sync disconnect on unload' : true});

    socket.on('joinRoom', (data) => {
        socket.join(data);
        socket.currentRoom = data;
        console.log('Odaya bağlı kullanıcı sayısı: ' + socket.adapter.rooms[data].length);
        console.log(`odaya giriş yapıldı: ${data}`);
        // socket.broadcast.to(data).emit('joinRoom','Deneme olsun bu');
    });

    socket.on('disconnect', () => {
        console.log('disconnect oldu, yakaladım', socket.id);

        console.log(socket.id);

        console.log(cookie.all());

        // Disconnect olan kullanıcının kullanıcı bilgilerini siliyoruz. Ancak burada silme yapmak çok mantıklı değil, çünkü adam telefonunu kapatıp
        // tekrar açtığında tekrar login olmasını isteyecek pek mantıklı değil gibi. status online/offline update olabilir guest kısmında.
        
        // Guests.deleteOne({_id : list.user_id}).then(function(event) {
        //     console.log(event);
        // });

        Guests.updateOne({socket_id: socket.id}, {status: false}).then(function(event) {
            console.log(event);
        });

    });

});

module.exports = {
    app,
    server
}
