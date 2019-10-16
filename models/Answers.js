import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const answersSchema = new Schema({
    user_id : {
        type: String
    },
    quiz_slug : {
        type: String
    },
    question_id : {
        type: String
    },
    radio : {
        type: String
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('Answer', answersSchema);
