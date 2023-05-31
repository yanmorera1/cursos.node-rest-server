import Role from '../models/role.js'
import User from '../models/user.js'

export const isValidRol = async (role = '') => {
    const roleExists = await Role.findOne({ role })
    if (!roleExists) {
        throw new Error(`Role ${role} is not valid`)
    }
}

export const emailExists = async (email = '') => {
    const emailExists = await User.findOne({ email })
    if (emailExists) {
        throw new Error(`Email ${email} is already registered`)
    }
}

export const existsUserById = async (id) => {
    const existsUser = await User.findOne({ id })
    if (!existsUser) {
        throw new Error(`Id ${id} doesnt exists`)
    }
}