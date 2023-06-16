import { request, response } from 'express'
import { Types } from 'mongoose'
import { User, Category, Product } from '../models/index.js'
const allowedCollections = ['users', 'categories', 'products', 'roles']

const searchUsers = async (criteria, res = response) => {
    const isMongoId = Types.ObjectId.isValid(criteria)
    if (isMongoId) {
        const user = await User.findById(criteria)
        return res.json({
            results: user ? [user] : [],
        })
    }

    const regex = new RegExp(criteria, 'i')
    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }],
    })
    return res.json({
        results: users,
    })
}

const searchProducts = async (criteria, res = response) => {
    const isMongoId = Types.ObjectId.isValid(criteria)
    if (isMongoId) {
        const product = await Product.findById(criteria).populate(
            'category',
            'name'
        )
        return res.json({
            results: product ? [product] : [],
        })
    }

    const regex = new RegExp(criteria, 'i')
    const products = await Product.find({
        $or: [{ name: regex }, { description: regex }],
        $and: [{ status: true }],
    }).populate('category', 'name')
    return res.json({
        results: products,
    })
}

const searchCategories = async (criteria, res = response) => {
    const isMongoId = Types.ObjectId.isValid(criteria)
    if (isMongoId) {
        const category = await Category.findById(criteria)
        return res.json({
            results: category ? [category] : [],
        })
    }

    const regex = new RegExp(criteria, 'i')
    const categories = await Category.find({
        $or: [{ name: regex }],
        $and: [{ status: true }],
    })
    return res.json({
        results: categories,
    })
}

export const search = async (req = request, res = response) => {
    const { collection, criteria } = req.params

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Allowed collections are: ${allowedCollections}`,
        })
    }

    switch (collection) {
        case 'users':
            await searchUsers(criteria, res)
            break
        case 'categories':
            await searchCategories(criteria, res)
            break
        case 'products':
            await searchProducts(criteria, res)
            break
        case 'roles':
            break
        default:
            return res.status(500).json({
                msg: 'Theres no have behavior define to do this',
            })
    }
}
