import express from 'express'
import cors from 'cors'
import { router as userRouter } from '../routes/user.routes.js'
import { router as authRouter } from '../routes/auth.routes.js'
import { router as categoriesRouter } from '../routes/categories.routes.js'
import { router as productsRouter } from '../routes/products.routes.js'
import { router as searchRouter } from '../routes/search.routes.js'
import { router as uploadsRouter } from '../routes/uploads.routes.js'
import { dbConnection } from '../database/config.db.js'
import swaggerUi from 'swagger-ui-express'
import { openapiSpecification } from '../docs/swagger.docs.js'
import fileUpload from 'express-fileupload'

export default class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            users: '/api/users',
            products: '/api/products',
            search: '/api/search',
            uploads: '/api/uploads',
        }

        //DB connection
        this.connectToDb()
        //Middlewares
        this.middlewares()
        //Routes
        this.routes()
    }

    async connectToDb() {
        await dbConnection()
    }

    middlewares() {
        //CORS
        this.app.use(cors())
        //swagger
        this.app.use(
            '/api/docs',
            swaggerUi.serve,
            swaggerUi.setup(openapiSpecification)
        )
        //read and parse body
        this.app.use(express.json())
        //public folder
        this.app.use(express.static('public'))
        //file upload
        this.app.use(
            fileUpload({
                useTempFiles: true,
                tempFileDir: '/tmp/',
                createParentPath: true,
            })
        )
    }

    routes() {
        this.app.use(this.paths.users, userRouter)
        this.app.use(this.paths.auth, authRouter)
        this.app.use(this.paths.categories, categoriesRouter)
        this.app.use(this.paths.products, productsRouter)
        this.app.use(this.paths.search, searchRouter)
        this.app.use(this.paths.uploads, uploadsRouter)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}
