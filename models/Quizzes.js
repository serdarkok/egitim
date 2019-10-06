import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const quizzesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }],
    start: {
        date: {
            type: Date
        }
    },
    finish: {
        date: {
            type: Date
        }
    },
    status: {
        type: Boolean,
        default: false
    }
});

export default Mongoose.model('Quiz', quizzesSchema);