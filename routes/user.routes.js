import { Router } from 'express'
import {
    usersDelete,
    usersGet,
    usersPatch,
    usersPost,
    usersPut,
} from '../controllers/users.controller.js'

export const router = Router()

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', usersGet)

router.put('/:id', usersPut)

router.post('/', usersPost)

router.delete('/', usersDelete)

router.patch('/', usersPatch)
