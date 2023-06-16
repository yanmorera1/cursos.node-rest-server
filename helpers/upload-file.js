import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const defaultValidExtensions = ['png', 'jpg', 'jpeg', 'gif']

export const uploadFile = (
    files,
    validExtensions = defaultValidExtensions,
    folder = ''
) => {
    return new Promise((resolve, reject) => {
        const { file } = files
        const splitedName = file.name.split('.')
        const extension = splitedName[splitedName.length - 1]

        //validate extension
        if (!validExtensions.includes(extension)) {
            reject(
                `Extension ${extension} is not valid, valid extensions: ${validExtensions}`
            )
            return
        }

        const tempName = `${uuidv4()}.${extension}`
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempName)

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }

            resolve(tempName)
        })
    })
}
