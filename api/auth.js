import Express from 'express';
const app = new Express();
import User from '../models/Users';
import Jwt from 'jsonwebtoken';

    app.post('/postLogin', async (req, res) => {
        try {
            // User modelinden kullanıcı adı find ediliyor
            const _user = await User.findOne({username: req.body.username});
            if (_user) {
            // Eğer kullanıcı varsa şifre kontrolü yapılıyor
                const _validate = await _user.isValidPassword(req.body.password);
                // _validate true ya da false dönmektedir. false olursa şifre kabul edilmedi demektir. Bu şekilde state'de mutations yapılabilir.
                if (_validate) {
                        // jasonwebtoken üzerinden token oluşturuluyor
                        const _token = Jwt.sign({mail: _user.email}, 'balik-bastan-kokar', {
                            expiresIn: 10
                        });
                    res.json(
                        {
                            auth: true,
                            token: _token
                        });
                }
                else {
                    res.json(
                        {
                            auth: false,
                            token: null
                        });
                }                
            }
            else {
                res.json(
                    {
                        auth: false,
                        token: null
                    });
            }
        } catch (error) {
            throw error;
        }
    });

    app.post('/verifyToken', async (req, res) => {
        const _token = req.body.token;
        try {
            // console.log(req.body.token)
            var decoded = await Jwt.verify(_token, 'balik-bastan-kokar');
            if (decoded) {
                res.json({auth: true});                
            }
        } catch (error) {
            res.json({auth: false});
        }
    });

    app.get('/logout', () => {

    });

module.exports = {
    path: '/api/',
    handler: app
}