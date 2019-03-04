const environment = process.env.NODE_ENV || 'development';    // set environment
const configuration = require('../../knexfile')[environment];   // pull in correct db with env configs
const database = require('knex')(configuration);           // define database based on above
const bcrypt = require('bcrypt')                         // bcrypt will encrypt passwords to be saved in db
const crypto = require('crypto')                         // built-in encryption node module

const signin = (request, response) => {
    const userReq = request.body
    let user
    findUserByEmail(userReq)
        .then(foundUser => {
            user = foundUser
            return checkPassword(userReq.password, foundUser)
        })
        .then((res) => createToken())
        .then(token => {
            updateUserToken(token, user)
            return token;
        })
        .then((token) => {
            if (user) {
                user.token = token
                delete user.password
                response.status(201).json(user)
            }
            else {
                response.status(404).json(null);
            }
        })
        .catch((err) => console.error(err)
        )
}
const findUserByEmail = (userReq) => {
    return database.raw("SELECT * FROM users WHERE email = ?", [userReq.email])
        .then((data) => data.rows[0])
}
const checkPassword = (reqPassword, foundUser) => {
    return new Promise((resolve, reject) =>
        bcrypt.compare(reqPassword, foundUser.password, (err, response) => {
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
    const user = request.body
    hashPassword(user.password)
        .then((hashedPassword) => {
            delete user.password
            user.password = hashedPassword
        })
        .then(() => createToken())
        .then(token => user.token = token)
        .then(() => createUser(user))
        .then(user => {
            if (user) {
                delete user.password
                response.status(201).json(user)
            }
            else {
                response.status(404).json(null);
            }        })
        .catch((err) => console.error(err))

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
    return database.raw(
        "INSERT INTO users (email, password, token, created_at) VALUES (?, ?, ?, ?) RETURNING id, email, created_at, token",
        [user.email, user.password, user.token, new Date()]
    )
        .then((data) => data.rows[0])
}
// crypto ships with node - we're leveraging it to create a random, secure token
const createToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, data) => {
            err ? reject(err) : resolve(data.toString('base64'))
        })
    })
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
const findByToken = (userReq) => {
    return database.raw("SELECT * FROM users WHERE token = ?", [userReq.token])
        .then((data) => data.rows[0])
}

const addSearch = (request, response, next) => {
    console.log('addSearch',request.body)
    //const id = request.body.user.id
    const search_term = request.body.text
    if (validString(search_term)) {
        addSearchToDb("9", search_term)
            .then((res) => {
                
            if (res) {
                response.status(201).json(search_term)
            }
            else {
                response.status(404).json(null);
            }

            }
            ).catch((err) => console.error(err))
    }
    else {
        next(new Error('Invalid search term'))
    }

}
validString = (str) => {
    return typeof str == 'string' &&
        str.trim() != '';
}

const addSearchToDb = (id, search_term) => {
    return database.raw(
        "INSERT INTO searches (id, search_term, service, time) VALUES (?, ?, ?, ?) RETURNING id, id, time",
        [id, search_term, 'flickr', new Date()]
    )
        .then((data) => data.rows[0])
}

const getUserByToken = (request, response) => {
    console.log('1')
    const userTokenReq = request.body
    let user

    findByToken(userTokenReq)
        .then(foundUser => {
            user = foundUser
        })
        .then(() => {
            console.log('usertoken',user)

            if (user) {
                delete user.password
                response.status(201).json(user)
            }
            else {
                console.log('token doesnt found in db, id:', userTokenReq);
                response.status(404).json(null);
            }
        })
        .catch((err) => console.error(err))
}
// don't forget to export!
module.exports = {
    signup, signin, addSearch, getUserByToken
}

