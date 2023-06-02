import { Router } from 'express'
import { check } from 'express-validator'

import {
    usersDelete,
    usersGet,
    usersPatch,
    usersPost,
    usersPut,
} from '../controllers/users.controller.js'

import {
    validateFields,
    validateJWT,
    haveRole,
    isAdminRole,
} from '../middlewares/index.js'

import {
    emailExists,
    existsUserById,
    isValidRol,
} from '../helpers/db-validators.js'

export const router = Router()

/**
 * @openapi
 * /users:
 *   get:
 *     tags:
 *      - users
 *     description: Gets all users
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', usersGet)

/**
 * @openapi
 * /users:
 *  post:
 *      tags:
 *          - users
 *      description: Creates an user
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
        check('email', 'Email is not valid').isEmail(),
        check('name', 'Name is required').not().isEmpty(),
        check(
            'password',
            'Password is required and more than 6 letters'
        ).isLength({ min: 6 }),
        // check('role', 'Role is not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom(isValidRol),
        check('email').custom(emailExists),
        validateFields,
    ],
    usersPost
)

/**
 * @openapi
 * /users/{id}:
 *  put:
 *      tags:
 *          - users
 *      description: Updates a user
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
router.put(
    '/:id',
    [
        check('id', 'Is not an valid id').isMongoId(),
        check('id').not().custom(existsUserById),
        check('role').custom(isValidRol),
        validateFields,
    ],
    usersPut
)

/**
 * @openapi
 * /users/{id}:
 *  delete:
 *      tags:
 *          - users
 *      description: Deletes a user
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
        // isAdminRole,
        haveRole('ADMIN_ROLE'),
        check('id', 'Is not an valid id').isMongoId(),
        check('id').not().custom(existsUserById),
        validateFields,
    ],
    usersDelete
)

/**
 * @openapi
 * /users/{id}:
 *  patch:
 *      tags:
 *          - users
 *      description: Updates a user
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
router.patch('/:id', usersPatch)
