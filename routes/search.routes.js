import { Router } from 'express'
import { search } from '../controllers/search.controller.js'

export const router = Router()

/**
 * @openapi
 * /api/search:
 *   get:
 *     tags:
 *      - search
 *     description: search
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/:collection/:criteria', search)
