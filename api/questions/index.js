import Express from 'express';
const app = new Express();
import bodyParser from 'body-parser';
import Question from '../../models/Questions';
import fs from 'fs-extra';
import multer from 'multer';
import path from 'path';

const tmp = path.resolve(__dirname, '../../tmp');
const dest = path.resolve(__dirname, '../../uploads');
var upload = multer({ dest: tmp});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/questions/add/photo', upload.single('Photo'), async (req, res) => { 
    const file = dest + '/'+ req.file.originalname;

    fs.move(req.file.path, file, function(err) {
        console.log(err);
    });
    
    example(req.body.photo, dest);

    async function example (src, dest) {
        try {
          await fs.move(srcpath, dstpath)
          console.log('success!')
        } catch (err) {
          console.error(err)
        }
      }
});

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

    // Önce şıkları kayıt ediyorum. Daha sonra bu kayıtlardan dönenleri promise'i değişkene atıyorum.
    // create metodu promise dönüyor.
/*     const c_hoices = await Promise.all([
            Choice.create(req.body.choices),
    ]);

    console.log(c_hoices[0]); */

    try {
        // promise'den dönen şıkların id'lerini choices'e aktarıyorum.
/*         const _question = {
            name: req.body.name,
            c_id: req.body.c_id,
            status: req.body.status,
            choices: c_hoices[0].map(choice => choice._id)
        } */

        // const _ = await Question(_question);
        const _ = await Question(req.body);
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
    const _list = await Question.find({}).populate('c_id');
    if (_list) {
        res.status(200).send(_list);
    }
});

// Quiz içerisinde soru eklerken kullanıyoruz
app.get('/questionsforquiz', async (req, res) => {
    const _list = await Question.find({}, '_id name c_id');
    if (_list) {
        res.status(200).send(_list);
    }
});

app.get('/questions/:id', async (req, res) => {
    const _result = await Question.findById(req.params.id).populate('c_id', '_id');
    if (_result) {
        res.status(200).send({
            status: true,
            data: _result
        });            
    }
});

app.post('/questions/edit', async (req, res) => {
    try {
        const _ = await Question.updateOne({_id: req.body._id}, req.body);
        console.log(_);
        if (_) {
            res.status(200).send('Ok');
        }
    } catch (error) {
        console.log(error)
    }
});

app.get('/questions/delete/:id', async (req, res) => {
    const _id = req.params.id;
    console.log('id:' + _id);
    if (_id) {
        try {
            const _result = await Question.deleteOne({_id : _id});
            if (_result) {
                res.status(200).send('Ok');
            } 
        } catch (error) {
            console.log(error);
        }
    }
});

module.exports = {
    path: '/api/',
    handler: app
}