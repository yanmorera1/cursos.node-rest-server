import { Router } from 'express'
import { check } from 'express-validator'
import { validateFields, validateFile } from '../middlewares/index.js'
import {
    getImage,
    loadFile,
    updateImage,
} from '../controllers/uploads.controller.js'
import { allowCollections } from '../helpers/index.js'

export const router = Router()

/**
 * @openapi
 * /api/upload:
 *  post:
 *      tags:
 *          - upload
 *      description: upload
 *      responses:
 *          200:
 *              description: Returns a mysterious string.
 */
router.post('/', validateFile, loadFile)

router.put(
    '/:collection/:id',
    [
        validateFile,
        check('id', 'Invalid mongo id').isMongoId(),
        check('collection').custom((c) =>
            allowCollections(c, ['users', 'products'])
        ),
        validateFields,
    ],
    updateImage
)

router.get(
    '/:collection/:id',
    [
        check('id', 'Invalid mongo id').isMongoId(),
        check('collection').custom((c) =>
            allowCollections(c, ['users', 'products'])
        ),
        validateFields,
    ],
    getImage
)
