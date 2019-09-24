import Express from 'express';
const app = new Express();
import Category from '../../models/Categories';

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
            if (_result) {
                res.status(200).send('Ok');
            }
        }
    });

    app.get('/categories/:id', async (req, res) => {
        console.log(req.params);
        const _result = await Category.findById(req.params.id);
        if (_result) {
            res.status(200).send({
                status: true,
                data: _result
            });            
        }
    });

module.exports = {
        path: '/api/',
        handler: app
}