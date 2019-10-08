import Express from 'express';
const app = new Express();
import bodyParser from 'body-parser';
import Quiz from '../../models/Quizzes';
import Moment from 'moment';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// tarih ile saati birleştirip mongdb formatına çevirir
function mergeDate(date, time) {
    if (date && time) {
        var _ = date + ' ' + time
        return Moment(_, "YYYY-MM-DD HH:mm");        
    }
    return;
}

app.post('/quizzes/add', async (req, res) => {
    var _quiz = req.body;
    _quiz.start.date = mergeDate(_quiz.start.date, _quiz.start.time);
    _quiz.finish.date = mergeDate(_quiz.finish.date, _quiz.finish.time);

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

app.get('/quizzes/mainpage', async (req, res) => {
    const _list = await Quiz.find({}).sort({'start.date': '1'});
    if (_list) {
        console.log(_list);
        res.status(200).send(_list);
    }
});

app.delete('/quizzes/delete', async (req, res) => {
    const _id = req.query.id;
    
    if (_id) {
        const _result = await Quiz.deleteOne({_id : _id});
        if (_result) {
            res.status(200).send('Ok');
        }
    }
});

app.get('/quizzes/:id', async (req, res) => {
    const _result = await Quiz.findById(req.params.id);
    console.log(_result);
    if (_result) {
        res.status(200).send({
            status: true,
            data: _result,
        });            
    }
});

app.post('/quizzes/edit', async (req, res) => {
    var _quiz = req.body;

    _quiz.start.date = mergeDate(_quiz.start.date, _quiz.start.time);
    _quiz.finish.date = mergeDate(_quiz.finish.date, _quiz.finish.time);
    
    try {
        const _ = await Quiz.updateOne({_id: req.body._id}, _quiz);
        console.log(_);
        if (_) {
            res.status(200).send('Ok');
        }
    } catch (error) {
        console.log(error)
    }
});

app.post('/quizzes/addquestions', async (req, res) => {
    console.log(req.body);  

    try {
        const _ =await Quiz.updateOne({_id: req.body.quiz_id}, {questions: req.body.questions});
        console.log(_);
        if(_) {
            res.status(200).send({
                status: true,
                message: _
            });
        }
   } catch (error) {
       res.status(400).send({
           status: false,
           message: error
       })
   }

});

module.exports = {
    path: '/api/',
    handler: app
}