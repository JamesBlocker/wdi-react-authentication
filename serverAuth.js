const
    jwt = require('jsonwebtoken'),
    { JWT_SECRET } = process.env
    user = require('./models/User.js')


//User.findOne( {email: req.body.email}, (err, thatUser) => {
//     signToken(thatUser0)
// })

function signToken(user) {
    const userData = user.toObject()
    delete userData.password
    return jwt.sign(userData, JWT_SECRET)
}

function verifyToken(req, res, next) {
    // check to see if token was provided
    const token = req.get('token')
    // if no token present deny access
    if(!token) return res.json({ success: false, message: "No token provided" })
    // otherwise try to verify token
    jwt.verify(token, JWT_SECRET, (err, decodedData) => {
        // if problem with token verification, deny access
        if(err) return res.json({ success: false, message: "Invalid token" })
        User.findById(decodedData._id, (err, user) => {
            // if no user deny access
            if(!user) return res.json({ success: false, message: "Invalid token" })
            // otherwise add user to req object and continue
            req.user = user
            next()
        })
    })
}

module.exports = {
    signToken,
    verifyToken
}