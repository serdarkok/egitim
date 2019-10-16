import Mongoose from 'mongoose';

        Mongoose.connect('mongodb://localhost:27017/egitim', {useNewUrlParser: true});

        Mongoose.set('useFindAndModify', true);

        Mongoose.connection.on('error', err => {
            console.log('Mongoose Failed');
        });

        Mongoose.connection.on('open', open => {
            console.log('Mongoose Connected');
        });

        module.exports = {
            path: '/api/',
        }