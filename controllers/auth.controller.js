import { request, response } from 'express'
import User from '../models/user.js'
import bcryptjs from 'bcryptjs'
import { generateJWT } from '../helpers/generate-jwt.js'
import { googleVerify } from '../helpers/google-verify.js'

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
        return res.json({
            user,
            token,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Talk to your administrator',
        })
    }
}

export const googleSignIn = async (req = request, res = response) => {
    const { id_token } = req.body
    try {
        const { name, img, email } = await googleVerify(id_token)

        let user = await User.findOne({ email })
        if (!user) {
            const data = {
                name,
                email,
                img,
                google: true,
                password: 'qwe',
                role: 'USER_ROLE',
            }
            user = new User(data)
            await user.save()
        }

        if (!user.status) {
            return res.status(401).json({ msg: 'User inactive' })
        }

        //generate jtw
        const token = await generateJWT(user.id)
        return res.json({
            user,
            token,
        })
    } catch (error) {
        return res.status(400).json({ msg: 'Token invalid' })
    }
}
