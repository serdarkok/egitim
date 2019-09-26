import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const choicesSchema = new Schema({
    name : {
        type: String,
        required: true
    },

/*     q_id : { 
        type: Schema.Types.ObjectId,
        ref: 'Questions.Question'
    }, */

    correct : {
        type: Boolean,
    },

    status: {
        type: Boolean,
        default: true,
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

export default Mongoose.model('Choice', choicesSchema);