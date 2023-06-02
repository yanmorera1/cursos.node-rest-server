import bcryptjs from 'bcryptjs'
import { response, request } from 'express'
import { User } from '../models/index.js'

export const usersPost = async (req, res) => {
    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })

    //encrypt password
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    //save in db
    await user.save()

    res.json(user)
}

export const usersGet = async (req = request, res = response) => {
    const { limit = 5, skip = 0 } = req.query
    const query = { status: true }

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(skip).limit(limit),
    ])

    res.json({
        total,
        users,
    })
}

export const usersPut = async (req, res) => {
    const { id } = req.params
    const { _id, password, google, email, ...rest } = req.body

    //TODO: validate vs db
    if (password) {
        const salt = bcryptjs.genSaltSync()
        rest.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, rest)

    res.json(user)
}

export const usersDelete = async (req, res) => {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, { status: false })
    res.json(user)
}

export const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador',
    })
}
