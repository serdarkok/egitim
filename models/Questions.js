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

    // choices: [Choices.schema],

    choices : [],
    
    status : {
        type: Boolean,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }

});

export default Mongoose.model('Question', questionsSchema);