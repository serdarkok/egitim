import Express from 'express';
const app = new Express();

    app.get('/auth', (req, res, next) => {
        res.send(req.body);
    });

module.exports = {
    path: '/api/',
    handler: app
}