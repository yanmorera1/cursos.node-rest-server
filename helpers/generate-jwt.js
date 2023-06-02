import jwt from 'jsonwebtoken'

export const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }
        jwt.sign(
            payload,
            process.env.SECRETORPRIVATEKEY,
            {
                expiresIn: '4h',
            },
            (err, token) => {
                if (err) {
                    console.log(err)
                    reject('Cannot generate jwt')
                } else {
                    resolve(token)
                }
            }
        )
    })
}
