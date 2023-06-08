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
/**
 * @openapi
 * /api/products:
 *   get:
 *     tags:
 *      - products
 *     description: Gets all products
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', getProducts)

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     tags:
 *      - products
 *     parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *     description: Gets product by id
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get(
    '/:id',
    [
        check('id', 'Is not an valid id').isMongoId(),
        check('id').custom(productExists),
        validateFields,
    ],
    getProduct
)

/**
 * @openapi
 * /api/products:
 *  post:
 *      tags:
 *          - products
 *      description: Creates an product
 *      parameters:
 *          -   in: user
 *              name: body
 *              required: true
 *              schema:
 *                  type: User
 *      responses:
 *          200:
 *              description: Returns a mysterious string.
 */
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

/**
 * @openapi
 * /api/products:
 *  put:
 *      tags:
 *          - products
 *      description: Creates an product
 *      parameters:
 *          -   in: user
 *              name: body
 *              required: true
 *              schema:
 *                  type: User
 *      responses:
 *          200:
 *              description: Returns a mysterious string.
 */
router.put(
    '/:id',
    [
        validateJWT,
        check('id', 'Is not an valid id').isMongoId(),
        check('id').custom(productExists),
        validateFields,
    ],
    updateProduct
)

/**
 * @openapi
 * /api/products/{id}:
 *  delete:
 *      tags:
 *          - products
 *      description: Deletes a product
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: integer
 *      responses:
 *          200:
 *              description: Returns a mysterious string.
 */
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
