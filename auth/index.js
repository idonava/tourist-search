const express = require('express');
const bodyParser= require('body-parser');
const router = express.Router();
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    res.json({
        message: 'lock'
    });
});
router.post('/signup', (req, res, next) => {
    console.log(req.body);
    if (validUser(req.body)) {
        res.json({
            message: 'Valid user - Needs to check in db for duplicate'
        });
    }
    else {
        next(new Error('Invalid user'))
    }
});

function validUser(user) {
    console.log(user);

    const validEmail = typeof user.email == 'string' &&
        user.email.trim() != '';
    const validPassword = typeof user.password == 'string' &&
        user.password.trim() != '' &&
        user.password.trim().length >= 6;

    return validEmail && validPassword;
}


module.exports = router;