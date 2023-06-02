import express from 'express'
import cors from 'cors'
import { router as userRouter } from '../routes/user.routes.js'
import { router as authRouter } from '../routes/auth.routes.js'
import { dbConnection } from '../database/config.db.js'
import swaggerUi from 'swagger-ui-express'
import { openapiSpecification } from '../docs/swagger.docs.js'

export default class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'
        this.authPath = '/api/auth'

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
    }

    routes() {
        this.app.use(this.usersPath, userRouter)
        this.app.use(this.authPath, authRouter)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}
