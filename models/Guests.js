// import mongoose from 'mongoose';
const mongoose = require('mongoose');
// import mongoose from "mongoose";

const Schema = mongoose.Schema;

const guestsSchema = new Schema({
        name : {
            type: String,
            required: true
        },

        socket_id : {
            type: String
        },

        status : {
            type: Boolean,
            default: true
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

// export default mongoose.model('Guest', guestsSchema);

module.exports = mongoose.model('Guest', guestsSchema);