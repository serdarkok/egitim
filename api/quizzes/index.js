import Express from 'express';
const app = new Express();
import bodyParser from 'body-parser';
import Quiz from '../../models/Quizzes';
import Moment from 'moment';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/quizzes/add', async (req, res) => {
    var _quiz = req.body;
    console.log(_quiz);
    
    var _ = _quiz.start.date + ' ' + _quiz.start.time
    const newStartDate = Moment(_, "YYYYMMDD HH:mm");
    _ = _quiz.finish.date + ' ' + _quiz.finish.time
    const newFinishDate = Moment(_, "YYYYMMDD HH:mm");
    _quiz.start.date = newStartDate;
    _quiz.finish.date = newFinishDate;

    console.log('Buraya uğramadı');
    console.log(_quiz);

    try {
         const __ = new Quiz(_quiz);
         await __.save((err, data) => {
            if (err) {
                throw err;
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
            message: error
        })
    }
});

app.get('/quizzes', async (req, res) => {
    const _list = await Quiz.find({});
    if (_list) {
        console.log(_list);
        res.status(200).send(_list);
    }
});

module.exports = {
    path: '/api/',
    handler: app
}