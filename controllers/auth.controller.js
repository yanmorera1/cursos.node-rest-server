import { response } from 'express'
import User from '../models/user.js'
import bcryptjs from 'bcryptjs'
import { generateJWT } from '../helpers/generate-jwt.js'

export const login = async (req, res = response) => {
    const { email, password } = req.body
    try {
        //verify if email exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: 'User/Password invalid - email',
            })
        }
        //verify if user is active
        if (!user.status) {
            return res.status(400).json({
                msg: 'User/Password invalid - state:false',
            })
        }
        //verify password
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User/Password invalid - password',
            })
        }
        //generate jtw
        const token = await generateJWT(user.id)
        res.json({
            user,
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Talk to your administrator',
        })
    }
}
