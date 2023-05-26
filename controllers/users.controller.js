import { response, request } from 'express'

export const usersGet = (req = request, res = response) => {
    const { apikey } = req.query
    res.json({
        msg: 'get API - controlador',
        apikey,
    })
}

export const usersPut = (req, res) => {
    const id = req.params.id
    res.json({
        msg: 'put API - controlador',
        id,
    })
}

export const usersPost = (req, res) => {
    const { name, edad } = req.body

    res.status(201).json({
        msg: 'post API - controlador',
        name,
        edad,
    })
}

export const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador',
    })
}

export const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API - controlador',
    })
}
