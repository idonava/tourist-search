const express = require('express');
const bodyParser = require('body-parser');
const User = require('../db/models/user')
const router = express.Router();

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    res.json({
        message: 'lock'
    });
});
router.post('/signup', User.signup);
router.post('/signin', User.signin)
router.post('/userFlickr', User.userFlickr)

// router.post('/signup', (req, res, next) => {
//     console.log(req.body);
//     if (validUser(req.body)) {
//         res.json({
//             message: 'Valid user - Needs to check in db for duplicate'
//         });
//     }
//     else {
//         next(new Error('Invalid user'))
//     }
// });



module.exports = router;