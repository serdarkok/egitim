import Express from 'express';
const app = new Express();

    app.post('/postLogin', (req, res) => {
        res.send('api içerisindeki auth çalıştı');
    });

module.exports = {
    path: '/api/',
    handler: app
}