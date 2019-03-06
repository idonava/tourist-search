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
router.post('/add-search', User.addSearch)
router.post('/get-user', User.getUserByToken)
router.post('/user-history', User.getUserHistoryByToken)
router.post('/delete-user-history', User.deleteUserHistoryByToken)

module.exports = router;