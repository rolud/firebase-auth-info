const firebaseAuth = require('firebase/auth')
const chalk = require('chalk')

const signInAnonymously = async () => {
    try {
        const auth = firebaseAuth.getAuth()
        const userCredential = await firebaseAuth.signInAnonymously(auth)
        const firebaseTokenID = await userCredential.user.getIdToken()

        console.log(chalk.green('Firebase User UID:'), userCredential.user.uid, '\n')
        console.log(chalk.green('Firebase Token ID:'), firebaseTokenID, '\n')
    } catch (error) {
        if (error.code === 'auth/admin-restricted-operation') {
            console.log(
                chalk.red.bold('ERROR!'),
                chalk.red('Anonymously authentication is not enabled in firebase project.'),
            )
        } else {
            throw error
        }
    }
}

module.exports = signInAnonymously
