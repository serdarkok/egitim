import Express from 'express';
const app = new Express();
import bodyParser from 'body-parser';
import Question from '../../models/Questions';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/questions/add', async (req, res) => {
    
    console.log(req.body);

    let _data = req.body;
    try {
        const _ = new Question(_data);
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
    } catch (err) {
        console.log(err)
        res.status(400).send({
            status: false,
            message: err
        });
    }

});

app.get('/questions', async (req, res) => {
    const _list = await Question.find({});
    if (_list) {
        res.status(200).send(_list);
    }
});

module.exports = {
    path: '/api/',
    handler: app
}