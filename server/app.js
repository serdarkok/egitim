const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Guests = require('../models/Guests');
const Cookies = require('js-cookie');
// import Guests from '../models/Guests';

function getCookie(name) {
    let cookie = {};
    name.split(';').forEach(function(el) {
      let [k,v] = el.split('=');
      cookie[k.trim()] = v;
    })
    return cookie;
  }

io.on('connection', async socket => {
    console.log('Socket Bağlandı');
    console.log(socket.id);
    
    // Kullanıcı tarayıcısını kapatıp tekrar açtığında cookie üzerinden user_id denetleniyor. user_id var ise kullanıcı socket_id'si ve status durumu güncelleniyor. 
    // Kullanıcı telefon ile baglandiginda telefonun ekranını kapatıp açtığında da güncelleyecek.
    
    // Cookie var mı yok mu?
    if(socket.request.headers.cookie != undefined) {
        const _cookie = getCookie(socket.request.headers.cookie);
        
        //Cookie var ise cookie içerisinde user_id var mı yok mu?
        if (_cookie.user_id) {
            await Guests.updateOne({_id: _cookie.user_id}, {status: true, socket_id: socket.id, updatedAt: Date.now()}).then(function(event) {
                console.log(event);
            });
        }
    }

    console.log('Bağlı Toplam kullanıcılar: ' + io.engine.clientsCount);
    socket.on('newQuestion', (data) => {
        socket.to(data.quiz_id).emit('sendQuestion', data);
    });

    socket.on('joinRoom', async (data) => {
        socket.join(data);
        socket.currentRoom = data;
        console.log('Odaya bağlı kullanıcı sayısı: ' + socket.adapter.rooms[data].length);
        console.log(`odaya giriş yapıldı: ${data}`);

        await Guests.find({status: true}).then(function(result) {
            console.log(result.length);
            console.log(data);
            console.log('Kullanıcı sayısı emit ediliyor...');
            socket.to(data).emit('addGuestCount', result.length);
        });
        
        // Aşağıdaki kod odaya giriş yapan herkese mesaj göndermek için
        // socket.broadcast.to(data).emit('joinRoom','Deneme olsun bu');
    });

    socket.on('disconnect', () => {
        console.log('disconnect oldu: ', + socket.id);

        // Disconnect olan kullanıcının kullanıcının status durumunu değiştiriyoruz. 
        // Bağlantısını kesen kullanıcının socket.id'sini alıp Guests üzerinden status'unu false yapıyoruz. Kullanıcı çıkış yapmış görünecek.
        Guests.updateOne({socket_id: socket.id}, {status: false, updatedAt: Date.now()}).then(function(event) {
            Guests.find({status: true}).then(function(result) {
                console.log(result.length);
                console.log('Kullanıcı sayısı emit ediliyor...');
                socket.to(socket.currentRoom).emit('addGuestCount', result.length);
            });
        });

    });

}, {'sync disconnect on unload' : true});

module.exports = {
    app,
    server
}
