import Express from 'express';
import Guest from '../../models/Guests';
const app = new Express();


app.post('/guests/add', async (req, res) => {
    console.log(req.body);
    try {
        const _ = new Guest(req.body);
        await _.save((err, data) => {
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
    } catch (error) {
        res.status(400).send({
            status: false,
            message: err
        });        
    }
});



module.exports = {
    path: '/api/',
    handler: app
}