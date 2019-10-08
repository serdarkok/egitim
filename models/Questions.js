import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const questionsSchema = new Schema({
    name : {
        type: String,
    },

    c_id : {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    
    status : {
        type: Boolean,
    },

    photo: {
        type: String
    },
/*     choices: [{
        type: Schema.Types.ObjectId,
        ref: 'Choice'
    }], */

    choices: [],

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