import Mongoose from 'mongoose';
import Bcrypt from 'bcryptjs';

const Schema = Mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
    },
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    email: {
        type: String,
    },

    password: {
        type: String,
        required: true
    },

    token: {
        type: String,
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

// Schema save çalışmadan önce burası çalışmaktadır.
userSchema.pre('save', async function(next) {
    var _user = this;
    const _passwd = await Bcrypt.hashSync(this.password, Bcrypt.genSaltSync(10))
    _user.password = _passwd;
    next();
});

// Şifre denetlemesi yapmaktadır.
userSchema.methods.isValidPassword = async function (password){
    const _user = this
    const compare = await Bcrypt.compare(password, _user.password)
    return compare
}

export default Mongoose.model('User', userSchema);