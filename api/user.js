import Express from 'express';
const app = new Express();


app.post('/registerUser', (req, res) => {
        console.log(req.body);
        return res.send(req.body);
});


module.exports = {
    path: '/api/',
    handler: app
}