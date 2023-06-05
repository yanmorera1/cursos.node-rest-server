import { User, Role, Category, Product } from '../models/index.js'

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
        throw new Error(`User with id ${id} doesnt exists`)
    }
}

export const categoryExists = async (id) => {
    const existsCategory = await Category.findOne({ id })
    if (!existsCategory) {
        throw new Error(`Category with id ${id} doesnt exists`)
    }
}

export const productExists = async (id) => {
    const existsProduct = await Product.findOne({ _id: id })
    if (!existsProduct) {
        throw new Error(`Product with id ${id} doesnt exists`)
    }
}
