const firebaseAuth = require('firebase/auth')
const chalk = require('chalk')

const signInWithEmailAndPassword = async (email, password) => {
    try {
        if (email === undefined || password === undefined) {
            console.log(chalk.red.bold('ERROR!'), chalk.red('Credentials are required.'))
            return
        }

        if (email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) === null) {
            console.log(chalk.red.bold('ERROR!'), chalk.red(`${email} is not a valid email`))
            return
        }

        const auth = firebaseAuth.getAuth()
        const userCredential = await firebaseAuth.signInWithEmailAndPassword(auth, email, password)
        const firebaseTokenID = await userCredential.user.getIdToken()

        console.log(chalk.green('Firebase User email:'), userCredential.user.email, '\n')
        console.log(chalk.green('Firebase User UID:'), userCredential.user.uid, '\n')
        console.log(chalk.green('Firebase Token ID:'), firebaseTokenID, '\n')
    } catch (error) {
        switch (error.code) {
            case 'auth/user-not-found':
                console.log(chalk.red.bold('ERROR!'), chalk.red('User not found.'))
                break
            case 'auth/wrong-password':
                console.log(chalk.red.bold('ERROR!'), chalk.red('Wrong password.'))
                break
            default:
                throw error
        }
    }
}

module.exports = signInWithEmailAndPassword
