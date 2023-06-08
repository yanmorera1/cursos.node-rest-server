import { request, response } from 'express'

export const search = (req = request, res = response) => {
    res.json({ msg: 'Buscar' })
}
