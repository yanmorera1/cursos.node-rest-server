import { request, response } from 'express'

export const isAdminRole = (req = request, res = response, next) => {
    if (!req.user) {
        return res
            .status(500)
            .json({ msg: 'Role validation failed bc token is not validated' })
    }
    const { role, name } = req.user
    if (role != 'ADMIN_ROLE') {
        return res.status(401).json({ msg: `${name} is not an administrator` })
    }

    next()
}

export const haveRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'Role validation failed bc token is not validated',
            })
        }
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `Unathorized: required roles: ${roles}`,
            })
        }
        next()
    }
}
