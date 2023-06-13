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
            break
        case 'products':
            break
        case 'roles':
            break
        default:
            return res.status(500).json({
                msg: 'Theres no have behavior define to do this',
            })
    }
}
