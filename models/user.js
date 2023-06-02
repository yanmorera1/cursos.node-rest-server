import { Schema, model } from 'mongoose'

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name required'],
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password required'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
})

UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject()
    return {
        uid: _id,
        ...user,
    }
}

export default model('User', UserSchema)
