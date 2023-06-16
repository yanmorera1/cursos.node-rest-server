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
import { categoryExists } from '../helpers/index.js'

export const router = Router()

/**
 * @openapi
 * /api/categories:
 *   get:
 *     tags:
 *      - categories
 *     description: Gets all categories
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', getCategories)

/**
 * @openapi
 * /api/categories/{id}:
 *   get:
 *     tags:
 *      - categories
 *     parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *     description: Gets category by id
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get(
    '/:id',
    [
        check('id', 'Is not an valid id').isMongoId(),
        check('id').custom(categoryExists),
        validateFields,
    ],
    getCategory
)

/**
 * @openapi
 * /api/categories:
 *  post:
 *      tags:
 *          - categories
 *      description: Creates an category
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
        validateFields,
    ],
    createCategory
)

/**
 * @openapi
 * /api/categories:
 *  put:
 *      tags:
 *          - categories
 *      description: Creates an category
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
        check('id').custom(categoryExists),
        check('name', 'Name required').notEmpty(),
        validateFields,
    ],
    updateCategory
)

/**
 * @openapi
 * /api/categories/{id}:
 *  delete:
 *      tags:
 *          - categories
 *      description: Deletes a category
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
        check('id').custom(categoryExists),
        validateFields,
    ],
    deleteCategory
)
