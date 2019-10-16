import Express from 'express';
const app = new Express();
import Answer from '../../models/Answers';
import Question from '../../models/Questions';

app.post('/answers/add', async (req, res) => {
    try {
        let _ = await Answer.replaceOne({user_id: req.body.user_id, question_id: req.body.question_id}, req.body, {upsert: true});
        if (_) {
            res.status(200).send({
                status: true
            });
        } else {
            res.status(400).send({
                status: false
            });
        }
    } catch (error) {
        console.log(error)
    }
});

function countAnswer (array, data) {
    return array.filter(x => x == data).length
}

app.get('/answer/:id', async (req, res) => {
    const question_id = req.params.id;
    const _ = await Answer.find({question_id});
    // console.log(_);
    const Obj = [];


    // Kullanıcı cevaplarını Obj array içerisine aktardım.
    _.map((obj, index) => {
        Obj.push(obj.radio);
    });

    // console.log(Obj);

    const question = await Question.findById(question_id);

    // ilgili soru şıklarına total olarak kaç kişi hangi seçeneği işaretlemiş onu ekliyor. Aynen şu şekilde:
/*  [ { dummy_id: '1', name: 'Evre', correct: false, total: 2 },
      { dummy_id: '2', name: 'Yaş', correct: false, total: 0 },
      { dummy_id: '3', name: 'N-myc amplifikasyonu', correct: false, total: 1 },
      { dummy_id: '4', name: 'Kemik metastazı', correct: false, total: 0 }
    ] */
        await question.choices.forEach(element => {
            // console.log(element.dummy_id);
            element.total = countAnswer(Obj, element.dummy_id);
        });

        const _result = {
            question: question,
            guest: 100 / Obj.length
        }
        res.send(_result);

    });

module.exports = {
    path: '/api/',
    handler: app
}