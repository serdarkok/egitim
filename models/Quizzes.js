import Mongoose from 'mongoose';
import Moment from 'moment';

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

/* // Schema save çalışmadan önce burası çalışmaktadır.
quizzesSchema.pre('save', async function(next) {
    const _data = this;
    console.log(_data);
    const dateTime = Moment(_data.start.date + ' ' + _data.start.time,);
    _data.start.date = dateTime;
    console.log(dateTime);
    next();
}); */

export default Mongoose.model('Quiz', quizzesSchema);