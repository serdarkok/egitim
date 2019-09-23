import Mongoose from 'mongoose';

const Schema = Mongoose.Schema;

const categorySchema = new Schema({
        name: {
            type: String,
            required: true
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

export default Mongoose.model('Category', categorySchema);