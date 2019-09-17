import Express from 'express';
const app = new Express();
import Mongoose from 'mongoose';
import User from '../models/Users';
import bodyParser from 'body-parser';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.post('/registerUser', (req, res) => {
        const _user = new User(req.body);

        _user.save((err, data) => {
            if (err) {
                res.status(400).send({
                    status: false,
                    message: err
                });
            } else {
                res.status(200).send({
                    status: true,
                    message: data
                });
            }
        });

        // return res.send(req.body);
        
});


module.exports = {
    path: '/api/',
    handler: app
}