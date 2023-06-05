import { Router } from 'express'
import {
    addProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct,
} from '../controllers/products.controller.js'
import { productExists } from '../helpers/db-validators.js'
import { validateJWT } from '../middlewares/validate-jwt.js'
import { validateFields } from '../middlewares/validate-fields.js'
import { isAdminRole } from '../middlewares/validate-roles.js'
import { check } from 'express-validator'

export const router = Router()

router.get('/', getProducts)

router.get(
    '/:id',
    [
        check('id', 'Is not an valid id').isMongoId(),
        check('id').custom(productExists),
        validateFields,
    ],
    getProduct
)

router.post(
    '/',
    [
        validateJWT,
        check('name', 'Name required').not().isEmpty(),
        check('price', 'Price required').not().isEmpty(),
        check('description', 'Description required').not().isEmpty(),
        check('category', 'Category id is not valid').isMongoId(),
        check('category', 'Category required').not().isEmpty(),
        validateFields,
    ],
    addProduct
)

router.put(
    '/:id',
    [
        validateJWT,
        check('id', 'Is not an valid id').isMongoId(),
        check('id').custom(productExists),
        check('category', 'Category id is not valid').isMongoId(),
        validateFields,
    ],
    updateProduct
)

router.delete(
    '/:id',
    [
        validateJWT,
        isAdminRole,
        check('id', 'Is not an valid id').isMongoId(),
        check('id').custom(productExists),
        validateFields,
    ],
    deleteProduct
)
