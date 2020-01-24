import Express from 'express';
import Guests from '../../models/Guests';
const app = new Express();


app.post('/guests/add', async (req, res) => {
    console.log(req.body);
    try {
        const _ = new Guests(req.body);
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

app.post('/guest/remove', async (req, res) => {
    console.log(req.body);

    try {
        const _result = await Guests.deleteOne({_id : req.body});

        if (_result) {
            res.status(200).send('Ok');
        } 

    } catch (error) {
        console.log(error);
    }

});

app.get('/guests/guestCount', async (req, res) => {

        try {
            const _result = await Guests.find({status: true});
            console.log(_result.length);
            res.json(_result.length);
        } catch (error) {
            console.log(error)
        }


});



module.exports = {
    path: '/api/',
    handler: app
}