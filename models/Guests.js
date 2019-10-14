import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const guestsSchema = new Schema({
        name : {
            type: String,
            required: true
        },

        socket_id : {
            type: String
        },

        createdAt: {
            type: Date,
            default: Date.now
        },
});

export default mongoose.model('Guest', guestsSchema);