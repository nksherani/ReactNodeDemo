
//routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
/* POST login. */
router.post('/login', function (req, res, next) {
    //console.log('login called');
    passport.authenticate('local', { session: false }, (err, user, info) => {
        console.log(err);
        console.log(user);
        console.log(info);
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                console.log(err);
                res.send(err);
            }

            // generate a signed son web token with the contents of user object and return it in the response
            const token = jwt.sign(user, 'your_jwt_secret');
            return res.json({ user, token });
        });
    })(req, res);
});

module.exports = router;