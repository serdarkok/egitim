import Express from 'express';
const app = new Express();
import Mongoose from 'mongoose';
import User from '../models/Users';

    app.post('/postLogin', async (req, res) => {
        const _user = await User.findOne({username: req.body.username});

        if (_user) {
            const _validate = await _user.isValidPassword(req.body.password);

            // _validate true ya da false dönmektedir. false olursa şifre kabul edilmedi demektir. Bu şekilde state'de mutations yapılabilir.
            res.send(_validate);
        }
    });

module.exports = {
    path: '/api/',
    handler: app
}