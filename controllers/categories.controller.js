import { query, request, response } from 'express'
import { Category } from '../models/index.js'

export const getCategories = async (req = request, res = response) => {
    const { limit = 5, skip = 0 } = req.query
    const query = { status: true }

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query).skip(skip).limit(limit).populate('user', 'name'),
    ])

    res.json({
        total,
        categories,
    })
}

export const getCategory = async (req = request, res = response) => {
    const { id } = req.query
    const query = { id, status: true }

    const category = await Category.findOne(query).populate('user', 'name')

    res.json(category)
}

export const createCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase()
    const categoryDb = await Category.findOne({ name })
    if (categoryDb) {
        return res.status(400).json({
            msg: `Category ${name} already exists`,
        })
    }
    //generate data to save
    const data = {
        name,
        user: req.user._id,
    }

    const category = await new Category(data)
    await category.save()

    return res.status(201).json(category)
}

export const updateCategory = async (req = request, res = response) => {
    const { id } = req.params
    const { user, status, ...rest } = req.body

    rest.name = rest.name.toUpperCase()
    rest.user = req.user._id

    const category = await Category.findByIdAndUpdate(id, rest)
    res.json(category)
}

export const deleteCategory = async (req = request, res = response) => {
    const { id } = req.params
    const category = await Category.findByIdAndUpdate(
        id,
        { status: false },
        { new: true }
    )
    res.json(category)
}
