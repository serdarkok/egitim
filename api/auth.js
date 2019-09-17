import Express from 'express';
const app = new Express();
import User from '../models/Users';
import Jwt from 'jsonwebtoken';

    app.post('/postLogin', async (req, res) => {
        try {
            const _user = await User.findOne({username: req.body.username});
            const _validate = await _user.isValidPassword(req.body.password);
            // _validate true ya da false dönmektedir. false olursa şifre kabul edilmedi demektir. Bu şekilde state'de mutations yapılabilir.
            if (_validate) {
                    const _token = Jwt.sign({mail: _user.email}, 'balik-bastan-kokar', {
                        expiresIn: 120
                    });
                    // console.log('Token: ' + JSON.stringify(_token));
                res.json(
                    {
                        auth: true,
                        token: _token
                    });
            }
        } catch (error) {
            throw error;
        }
    });

    app.post('/verifyToken', async (req, res) => {
        try {
            
        } catch (error) {
            
        }
    });

module.exports = {
    path: '/api/',
    handler: app
}