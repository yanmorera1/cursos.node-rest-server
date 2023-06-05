import { Schema, model } from 'mongoose'

export const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

CategorySchema.methods.toJSON = function () {
    const { __v, status, ...category } = this.toObject()
    return {
        ...category,
    }
}

export default model('Category', CategorySchema)