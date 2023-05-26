import express from 'express'
import cors from 'cors'
import { router } from '../routes/user.routes.js'

export default class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'

        //Middlewares
        this.middlewares()
        //Routes
        this.routes()
    }

    middlewares() {
        //CORS
        this.app.use(cors())
        //read and parse body
        this.app.use(express.json())
        //public folder
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usersPath, router)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}
