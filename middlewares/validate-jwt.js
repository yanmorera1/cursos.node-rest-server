import { request, response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'

export const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token')
    if (!token)
        return res.status(401).json({
            msg: 'Unathorized',
        })

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const user = await User.findById(uid)

        if (!user) {
            return res.status(401).json({
                msg: 'Invalid token: user not exists',
            })
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Invalid token: user inactive',
            })
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'Invalid token',
        })
    }
}
