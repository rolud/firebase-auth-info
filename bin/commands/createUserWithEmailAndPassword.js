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
        const userCredential = await firebaseAuth.createUserWithEmailAndPassword(
            auth,
            email,
            password,
        )
        const firebaseTokenID = await userCredential.user.getIdToken()

        console.log(chalk.green('Firebase User email:'), userCredential.user.email, '\n')
        console.log(chalk.green('Firebase User UID:'), userCredential.user.uid, '\n')
        console.log(chalk.green('Firebase Token ID:'), firebaseTokenID, '\n')
    } catch (error) {
        switch (error.code) {
            case 'auth/weak-password':
                console.log(
                    chalk.red.bold('ERROR!'),
                    chalk.red('Password should be at least 6 characters.'),
                )
                break
            case 'auth/email-already-in-use':
                console.log(chalk.red.bold('ERROR!'), chalk.red('Email already exists.'))
                break
            default:
                throw error
        }
    }
}

module.exports = signInWithEmailAndPassword
