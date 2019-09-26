import Express from 'express';
const app = new Express();
import bodyParser from 'body-parser';
import Question from '../../models/Questions';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/questions/add', async (req, res) => {
    try {
        const _ = new Question(req.body);
        _.save((err, data) => {
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