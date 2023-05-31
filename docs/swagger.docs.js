import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Coffee Store API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.routes.js'],
}

export const openapiSpecification = swaggerJsdoc(options)
