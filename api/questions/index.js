import Express from 'express';
const app = new Express();
import bodyParser from 'body-parser';
import Question from '../../models/Questions';
import Choice from '../../models/Choices';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/questions/add', async (req, res) => {
    
    // console.log(req.body);
    // {   name: 'a sample question.',
    //     c_id: '5d892abd26c2e004916ea3b5', // category-id
    //     choices:
    //     [   { dummy_id: '1', name: 'choice 1', correct: false },
    //         { dummy_id: '2', name: 'choice 2', correct: true },
    //         { dummy_id: '3', name: 'choice 3', correct: false } 
    //     ],
    //     status: true 
    // }

    // Önce şıkları kayıt ediyorum. Daha sonra bu kayıtlardan dönen promise'i değişkene atıyorum.
    const c_hoices = await Promise.all([
            Choice.create(req.body.choices),
    ]);

    console.log(c_hoices[0]);

    try {
        // promise'den dönen şıkların id'lerini choices'e aktarıyorum.
        const _question = {
            name: req.body.name,
            c_id: req.body.c_id,
            status: req.body.status,
            choices: c_hoices[0].map(choice => choice._id)
        }

        console.log(_question);

        const _ = await Question(_question);
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
        res.status(400).send({
            status: false,
            message: err
        });
    }

});

app.get('/questions', async (req, res) => {
    const _list = await Question.find({}).populate('c_id').populate('choices');
    console.log(_list);
    if (_list) {
        res.status(200).send(_list);
    }
});

module.exports = {
    path: '/api/',
    handler: app
}