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
            console.log(user)
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
const findUserByEmail = async (userReq) => {
    const data = await database.raw("SELECT * FROM users WHERE email = ?", [userReq.email]);
    return data.rows[0];
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
const updateUserToken = async (token, user) => {
    const data = await database.raw("UPDATE users SET token = ? WHERE id = ? RETURNING id, email, token", [token, user.id]);
    return data.rows[0];
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
            }
        })
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
const createUser = async (user) => {
    const data = await database.raw("INSERT INTO users (email, password, token, created_at) VALUES (?, ?, ?, ?) RETURNING id, email, created_at, token", [user.email, user.password, user.token, new Date()]);
    return data.rows[0];
}
// crypto ships with node - we're leveraging it to create a random, secure token
const createToken = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, data) => {
            err ? reject(err) : resolve(data.toString('base64'))
        })
    })
}
const findByToken = async (token) => {
    const data = await database.raw("SELECT * FROM users WHERE token = ?", [token]);
    return data.rows[0];
}
const findHistoryById = async (userReq) => {
    const data = await database.raw("SELECT * FROM searches WHERE id = ?", [userReq]);
    return data.rows;

}
const deleteHistoryById = async (userReq) => {
    const data = await database.raw("DELETE FROM searches WHERE id = ?", [userReq]);
    return data.rows[0];
}
validString = (str) => {
    return typeof str == 'string' &&
        str.trim() != '';
}
const addSearch = (request, response) => {
    const userToken = request.body.token
    const userSearchTerm = request.body.text
    const userTotalResults = request.body.totalResults
    let user
    findByToken(userToken)
        .then(foundUser => {
            user = foundUser
        })
        .then(() => {
            if (user) {
                addSearchToDb(''+user.id, userSearchTerm, userTotalResults)
                    .then((history) => {
                        response.status(201).json(history);
                    })
            }
            else {
                response.status(404).json(null);
            }
        })
        .catch((err) => console.error(err))

}

const addSearchToDb = async (id, search_term,userTotalResults) => {
    const data = await database.raw("INSERT INTO searches (id, search_term, service, time,num_of_results) VALUES (?, ?, ?, ?,?) RETURNING id, id, time", [id, search_term, 'flickr', new Date(),userTotalResults]);
    return data.rows[0];
}
const getUserByToken = (request, response) => {
    const userTokenReq = request.body
    let user
    findByToken(userTokenReq.token)
        .then(foundUser => {
            user = foundUser
        })
        .then(() => {
            if (user) {
                delete user.password
                response.status(201).json(user)
            }
            else {
                response.status(404).json(null);
            }

        })
        .catch((err) => console.error(err))

}

const getUserHistoryByToken = (request, response) => {
    const userTokenReq = request.body
    let user
    findByToken(userTokenReq.token)
        .then(foundUser => {
            user = foundUser
        })
        .then(() => {
            if (user) {
                findHistoryById('' + user.id)
                    .then((history) => {
                        response.status(201).json(history);
                    })
            }
            else {
                response.status(404).json(null);
            }
        })
        .catch((err) => console.error(err))

}
const deleteUserHistoryByToken = (request, response) => {
    const userTokenReq = request.body
    let user
    findByToken(userTokenReq.token)
        .then(foundUser => {
            user = foundUser
        })
        .then(() => {
            if (user) {
                deleteHistoryById('' + user.id)
                    .then((history) => {
                        response.status(201).json(history)
                    })
            }
            else {
                response.status(404).json(null);
            }
        })
        .catch((err) => console.error(err))
}
// don't forget to export!
module.exports = {
    signup, signin, addSearch, getUserByToken, getUserHistoryByToken, deleteUserHistoryByToken
}

