import { Schema, model } from 'mongoose'

export const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    price: {
        type: Number,
        default: 0,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true,
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
    img: {
        type: String,
    },
})

ProductSchema.methods.toJSON = function () {
    const { __v, status, ...category } = this.toObject()
    return {
        ...category,
    }
}

export default model('Product', ProductSchema)
