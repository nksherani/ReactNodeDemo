//passport.js
var querydb = require('./query_db');
var bcrypt = require('bcryptjs')

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, cb) {

        var query_ = 'select top 1 * from NodeUsers where email = \'' + email + '\'';
        querydb.QueryDb(query_).then(function (user) {
            user = user['recordsets'][0][0];
            if (!user) {
                return cb(null, false, { message: 'Incorrect email or password.' });
            }
            bcrypt.compare(password, user.PasswordHash, function (err, succ) {
                if (err)
                    console.log(err);
                if (succ) {
                    var usertemp = {
                        username: user.UserName,
                        email: user.Email
                    };
                    return cb(null, usertemp, { message: 'Logged In Successfully' });
                }
            });

        }).catch(function (ex) {
            console.log(ex);
            console.log("Promise Rejected");
        });

    }
));


passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    function (jwtPayload, cb) {
        console.log(jwtPayload);

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        //var user = querydb.QueryDb('select top 1 * from NodeUsers where email = \'' + email + '\'');
        //if (user)
            //return cb(null, user);
        //else
        //    return "";
        return cb(null, jwtPayload);
      
    }
));

