import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const questionsSchema = new Schema({
    name : {
        type: String,
        required: true
    },

    c_id : {
        type: String,
        required: true
    },
    
    status : {
        type: Boolean,
    }

});

export default Mongoose.model('Question', questionsSchema);