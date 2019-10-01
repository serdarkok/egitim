import Express from 'express';
const app = new Express();
import Category from '../../models/Categories';
import bodyParser from 'body-parser';
import Question from '../../models/Questions';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

    app.post('/categories/add', async (req, res) => {
        try { 
            const _category = new Category(req.body);

            _category.save((err, data) => {
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
        }
        catch {
            res.status(400).send({
                status: false,
                message: err
            });
        }
    });

    app.get('/categories', async (req, res) => {
        const _list = await Category.find({});
        if (_list) {
            res.status(200).send(_list);
        }
    });

    app.get('/categories/delete', async (req, res) => {
        const _id = req.query.id;
        if (_id) {
            const _result = await Category.deleteOne({_id : _id});
            const _move = await Question.updateMany({c_id : _id}, {c_id : '5d930ede2a55cc289b587357'});
            if (_result) {
                res.status(200).send('Ok');
            }
        }
    });

    app.get('/categories/:id', async (req, res) => {
        const _result = await Category.findById(req.params.id);
        if (_result) {
            res.status(200).send({
                status: true,
                data: _result
            });            
        }
    });

    app.post('/categories/edit', async (req, res) => {
        try {
            const _ = await Category.updateOne({_id: req.body._id}, { name: req.body.name, status: req.body.status });
            console.log(_);
            if (_) {
                res.status(200).send('Ok');
            }
        } catch (error) {
            console.log(error)
        }
    });

module.exports = {
        path: '/api/',
        handler: app
}