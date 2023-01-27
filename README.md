# Firebase Auth Info

<div align="center">

[![NPM version][npmjs-badge]][npmjs-com]

</div>

Command line utility to generated firebase authenticated info.

## Installation

```
npm install -g firebase-auth-info
```


## Usage

```
firebase-auth-info path_to_firebase_config.json options
```

### Options

- `--anonymously`, `-a`: anonymous authentication
    ```
    firebase-auth-info path_to_firebase_config.json --anonymously
    ```

    > Requires anonymously authentication provider enabled

- `--create`, `-c`: create user with email and password
    ```
    firebase-auth-info path_to_firebase_config.json --create <email> <password>
    ```

    > Requires email/password authentication provider enabled


- `--signin`, `-s`: sign in with email and password
    ```
    firebase-auth-info path_to_firebase_config.json --signin <email> <password>
    ```

    > Requires email/password authentication provider enabled


### Firebase Config

In order to generate firebase config file:

1. Create Firebase project
2. Enable authentication
3. Create web app
4. Create json file with firebase config details, it should be the following one

```json
{
  "apiKey": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "authDomain": "XXXX-XXXX.firebaseapp.com",
  "projectId": "XXXX-XXXX",
  "storageBucket": "XXXX-XXXX.appspot.com",
  "messagingSenderId": "XXXXXXXXXXXXXX",
  "appId": "X:XXXXXXXXXXXX:web:XXXXXXXXXXXXXXX",
  "measurementId": "X-XXXXXXXX"
}
```


[npmjs-badge]: https://img.shields.io/npm/v/firebase-auth-info.svg?logo=npm
[npmjs-com]: https://www.npmjs.com/package/firebase-auth-info