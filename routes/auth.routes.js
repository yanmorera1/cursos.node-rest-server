import { Router } from 'express'
import { check } from 'express-validator'
import { googleSignIn, login } from '../controllers/auth.controller.js'
import { validateFields } from '../middlewares/index.js'

export const router = Router()

/**
 * @openapi
 * /api/auth/login:
 *  post:
 *      tags:
 *          - auth
 *      description: Login
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
    '/login',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').not().isEmpty(),
        validateFields,
    ],
    login
)

/**
 * @openapi
 * /api/auth/google:
 *  post:
 *      tags:
 *          - auth
 *      description: Login with google
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
    '/google',
    [check('id_token', 'Id_Token is required').not().isEmpty(), validateFields],
    googleSignIn
)
