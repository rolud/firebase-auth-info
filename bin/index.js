#! /usr/bin/env node

const firebaseApp = require('firebase/app')
const fs = require('fs')
const chalk = require('chalk')

const signInAnonymously = require('./commands/signInAnonymously')
const createUserWithEmailAndPassword = require('./commands/createUserWithEmailAndPassword')
const signInWithEmailAndPassword = require('./commands/signInWithEmailAndPassword')

const availableCommands = ['--anonymous', '--create', '--signin', '-a', '-c', '-s']

const main = async () => {
    const args = process.argv.slice(2)

    const filepath = args[0]
    const command = args[1]
    const email = args[2]
    const password = args[3]

    if (filepath === undefined) {
        console.log(chalk.red.bold('ERROR!'), chalk.red('Firebase config file required!'))
        return
    }

    const exists = await fs.existsSync(filepath)
    if (!exists) {
        console.log(chalk.red.bold('ERROR!'), chalk.red(`No file exists with path ${filepath}`))
        return
    }

    let firebaseConfig
    try {
        const fileContent = await fs.readFileSync(filepath, { encoding: 'utf-8', flag: 'r' })
        firebaseConfig = JSON.parse(fileContent)
    } catch (error) {
        console.log(chalk.red.bold('ERROR!'), chalk.red(`${filepath} is not a valid json`))
    }

    firebaseApp.initializeApp(firebaseConfig)

    if (command === undefined) {
        console.log(chalk.red.bold('ERROR!'), chalk.red('No command passed'))
        return
    }

    if (!availableCommands.includes(command)) {
        console.log(chalk.red.bold('ERROR!'), chalk.red(`${command} option is not available`))
        return
    }

    switch (command) {
        case '-a':
        case '--anonymous':
            signInAnonymously()
            break
        case '-c':
        case '--create':
            createUserWithEmailAndPassword(email, password)
            break
        case '-s':
        case '--signin':
            signInWithEmailAndPassword(email, password)
            break
        default:
    }
}

main()
