import { request, response } from 'express'
import { Product } from '../models/index.js'

export const getProducts = async (req = request, res = response) => {
    const { limit = 5, skip = 0 } = req.query
    const query = { status: true }

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .skip(skip)
            .limit(limit)
            .populate('user', 'name')
            .populate('category', 'name'),
    ])

    res.json({
        total,
        products,
    })
}

export const getProduct = async (req = request, res = response) => {
    const { id } = req.query
    const query = { id, status: true }

    const product = await Product.findOne(query)
        .populate('user', 'name')
        .populate('category', 'name')

    return res.json(product)
}

export const addProduct = async (req = request, res = response) => {
    const { name, price, category, description } = req.body
    const productExists = await Product.findOne({ name, category })
    if (productExists) {
        return res.json({
            msg: `Product with name ${name} and categoryId ${category} already exists`,
        })
    }

    const data = {
        name,
        price,
        category,
        description,
        user: req.user._id,
    }

    const product = await new Product(data)
    await product.save()

    return res.status(201).json(product)
}
export const updateProduct = async (req = request, res = response) => {
    const { id } = req.query
    const { user, status, ...rest } = req.body

    rest.user = req.user._id
    const product = await Product.findByIdAndUpdate(id, rest)

    res.json(product)
}
export const deleteProduct = async (req = request, res = response) => {
    const { id } = req.query
    const product = await Product.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
    )

    res.json(product)
}