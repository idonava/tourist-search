const environment = process.env.NODE_ENV || 'development';    // set environment
const configuration = require('../../knexfile')[environment];   // pull in correct db with env configs
const database = require('knex')(configuration);           // define database based on above
const bcrypt = require('bcrypt')                         // bcrypt will encrypt passwords to be saved in db
const crypto = require('crypto')                         // built-in encryption node module

const signin = (request, response) => {

    const userReq = request.body
    let user
    console.log('[Post req] signin: ', userReq);



    findUser(userReq)
        .then(foundUser => {
            user = foundUser
            return checkPassword(userReq.password, foundUser)
        })
        .then((res) => createToken())
        .then(token => updateUserToken(token, user))
        .then(() => {
            delete user.password
            response.status(200).json(user)
        })
        .catch((err) => console.error(err)
        )
}
const findUser = (userReq) => {
    return database.raw("SELECT * FROM users WHERE email = ?", [userReq.email])
        .then((data) => data.rows[0])
}
const checkPassword = (reqPassword, foundUser) => {
    console.log(reqPassword, foundUser.password)
    return new Promise((resolve, reject) =>
        bcrypt.compare(reqPassword, foundUser.password, (err, response) => {
            console.log(err, response)
            if (err) {
                reject(err)
            }
            else if (response) {
                resolve(response)
            } else {
                reject('Passwords do not match.')
            }
        })
    )

}
const updateUserToken = (token, user) => {
    return database.raw("UPDATE users SET token = ? WHERE id = ? RETURNING id, email, token", [token, user.id])
        .then((data) => data.rows[0])
}
const signup = (request, response, next) => {
    console.log(request)
    const user = request.body
    console.log('[Post req] signup: ', user);
    if (validUser(user)) {  
        hashPassword(user.password)
            .then((hashedPassword) => {
                delete user.password
                user.password = hashedPassword
                console.log(user.password)
            })
            .then(() => createToken())
            .then(token => user.token = token)
            .then(() => createUser(user))
            .then(user => {
                delete user.password
                response.status(201).json({ user })
            })
            .catch((err) => console.error(err))
    }
    else {
        next(new Error('Invalid user'))
    }
}

// check out bcrypt's docs for more info on their hashing function
const hashPassword = (password) => {
    return new Promise((resolve, reject) =>
        bcrypt.hash(password, 10, (err, hash) => {
            err ? reject(err) : resolve(hash)
        })
    )
}
// user will be saved to db - we're explicitly asking postgres to return back helpful info from the row created
const createUser = (user) => {
    console.log(user.password)
    return database.raw(
        "INSERT INTO users (email, password, token, created_at) VALUES (?, ?, ?, ?) RETURNING id, email, created_at, token",
        [user.email, user.password, user.token, new Date()]
    )
        .then((data) => data.rows[0])
}
// crypto ships with node - we're leveraging it to create a random, secure token
const createToken = () => {
    console.log('createToken')
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, data) => {
            err ? reject(err) : resolve(data.toString('base64'))
        })
    })
}
function validUser(user) {

    const validEmail = typeof user.email == 'string' &&
        user.email.trim() != '';
    const validPassword = typeof user.password == 'string' &&
        user.password.trim() != '' &&
        user.password.trim().length >= 6;

    return validEmail && validPassword;
}
const userFlickr = (request, response) => {
    const userReq = request.body
    if (authenticate(userReq)) {
        response.status(200)
    } else {
        response.status(404)
    }
}
const authenticate = (userReq) => {
    findByToken(userReq.token)
        .then((user) => {
            if (user.username == userReq.username) {
                return true
            } else {
                return false
            }
        })
}
const findByToken = (token) => {
    return database.raw("SELECT * FROM users WHERE token = ?", [token])
        .then((data) => data.rows[0])
}
// don't forget to export!
module.exports = {
    signup, signin, userFlickr
}

