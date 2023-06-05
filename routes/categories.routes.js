import { Router } from 'express'
import { check } from 'express-validator'
import {
    isAdminRole,
    validateFields,
    validateJWT,
} from '../middlewares/index.js'
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategory,
    updateCategory,
} from '../controllers/categories.controller.js'
import { categoryExists } from '../helpers/db-validators.js'

export const router = Router()

router.get('/', getCategories)

router.get(
    '/:id',
    [
        check('id', 'Is not an valid id').isMongoId(),
        check('id').custom(categoryExists),
        validateFields,
    ],
    getCategory
)

router.post(
    '/',
    [
        validateJWT,
        check('name', 'Name required').not().isEmpty(),
        validateFields,
    ],
    createCategory
)

router.put(
    '/:id',
    [
        validateJWT,
        check('id', 'Is not an valid id').isMongoId(),
        check('id').custom(categoryExists),
        check('name', 'Name required').notEmpty(),
        validateFields,
    ],
    updateCategory
)

router.delete(
    '/:id',
    [
        validateJWT,
        isAdminRole,
        check('id', 'Is not an valid id').isMongoId(),
        check('id').custom(categoryExists),
        validateFields,
    ],
    deleteCategory
)
