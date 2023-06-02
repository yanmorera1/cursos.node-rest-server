import { CodeChallengeMethod, OAuth2Client } from 'google-auth-library'

const clientId = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(clientId)

export const googleVerify = async (token = '') => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientId,
    })
    const { name, picture, email } = ticket.getPayload()
    return { name, img: picture, email }
}
