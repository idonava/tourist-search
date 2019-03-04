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
router.post('/auth/signup', User.signup);
router.post('/auth/signin', User.signin)
router.post('/addsearch', User.addSearch)
router.post('/getuser', User.getUserByToken)


// router.post('/signup', (req, res, next) => {
//     //console.log(req.body);
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