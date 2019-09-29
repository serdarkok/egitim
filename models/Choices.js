import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const choicesSchema = new Schema({
    dummy_id : {
        type: Number
    },

    name : {
        type: String
    },

    correct : {
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

export default Mongoose.model('Choice', choicesSchema);