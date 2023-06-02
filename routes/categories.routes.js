import { Router } from 'express'
import { check } from 'express-validator'
import { validateFields, validateJWT } from '../middlewares/index.js'
import {
    createCategory,
    getCategories,
    getCategory,
} from '../controllers/categories.controller.js'
import { categoryExists } from '../helpers/db-validators.js'

export const router = Router()

//get all categories - public
router.get('/', getCategories)

//get category by id - public
router.get(
    '/:id',
    [
        check('id', 'Is not an valid id').isMongoId(),
        check('id').custom(categoryExists),
    ],
    getCategory
)

//create category - token required
router.post(
    '/',
    [
        validateJWT,
        check('name', 'Name required').not().isEmpty(),
        validateFields,
    ],
    createCategory
)

//update category - token required
router.put('/:id', (req, res) => {
    res.json('put')
})

//delete category - token required
router.delete('/:id', (req, res) => {
    res.json('delete')
})
