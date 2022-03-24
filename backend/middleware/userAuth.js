const jwt = require("jsonwebtoken")
const secretKey = require("../token/userToken").apply()
const userModel = require("../Database/userModel")


// this middleware will check if user is logged in or not at the time of making the request

const userAuth = async (req, res, next) => {
    const {authorization} = req.headers
    if(authorization && authorization.startsWith("Bearer")) {

        // collecting jwt token from headers
        const token = authorization.split(" ")[1]
        const {userId} = jwt.verify(token, secretKey)
        const findUser = await userModel.findById(userId)
        if(findUser) {
            // attaching user to request
            req.user = {...findUser}
            next()
        } else {
            res.send({"status":"failed", msg:"invalid token", user:null})
        }

    } else {
        res.send({"status":"failed", msg:"token not found", user:null})
    }
}

module.exports = userAuth