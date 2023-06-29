import { response } from 'express'
import { uploadFile } from '../helpers/index.js'
import { User, Product } from '../models/index.js'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const configureCloudinary = () => {
    const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
        process.env

    cloudinary.config({
        cloud_name: CLOUDINARY_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_API_SECRET,
    })
}

export const loadFile = async (req, res = response) => {
    try {
        // const name = await uploadFile(req.files, ['txt', 'md'], 'plainTexts')
        const name = await uploadFile(req.files, undefined, 'imgs')
        res.json({ name })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

export const updateImage = async (req, res = response) => {
    const { id, collection } = req.params
    let model
    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `User with id ${id} does not exists`,
                })
            }
            break
        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `Product with id ${id} does not exists`,
                })
            }
            break
        default:
            return res.status(500).json({
                msg: 'I forgot to validate this',
            })
    }

    //clean previous images
    if (model.img) {
        const pathImage = path.join(
            __dirname,
            '../uploads',
            collection,
            model.img
        )
        if (fs.existsSync(pathImage)) {
            fs.unlinkSync(pathImage)
        }
    }
    model.img = await uploadFile(req.files, undefined, collection)
    await model.save()
    res.json(model)
}

export const getImage = async (req, res = response) => {
    const { id, collection } = req.params

    let model
    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `User with id ${id} does not exists`,
                })
            }
            break
        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `Product with id ${id} does not exists`,
                })
            }
            break
        default:
            return res.status(500).json({
                msg: 'I forgot to validate this',
            })
    }

    if (model.img) {
        const pathImage = path.join(
            __dirname,
            '../uploads',
            collection,
            model.img
        )
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage)
        }
    }

    const placeHolderPath = path.join(__dirname, '../assets', 'no-image.jpg')
    if (fs.existsSync(placeHolderPath)) {
        return res.sendFile(placeHolderPath)
    }
}

export const updateImageCloudinary = async (req, res = response) => {
    configureCloudinary()
    const { id, collection } = req.params
    let model
    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `User with id ${id} does not exists`,
                })
            }
            break
        case 'products':
            model = await Product.findById(id)
            if (!model) {
                return res.status(400).json({
                    msg: `Product with id ${id} does not exists`,
                })
            }
            break
        default:
            return res.status(500).json({
                msg: 'I forgot to validate this',
            })
    }

    //clean previous images
    if (model.img) {
        //TODO: implement this
    }

    const { tempFilePath } = req.files.file
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

    model.img = secure_url
    await model.save()

    res.json(model)
}
