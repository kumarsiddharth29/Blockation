const ErrorHandler = require("../utils/errorhander")

function auth(req, res, next) {
    let authToken = req.headers.authorization?.split(' ')[1];
    console.log(req.headers);
    if (!authToken) {
        return next(new ErrorHandler("Unauthorized. Please login to access the content", 401));
    }
    authToken = JSON.parse(authToken)
    req.user = authToken;
    console.log(req.user);
    if(req.user) {

       
        return next()
    }
    return next(new ErrorHandler("unauthorized please login to access the content",401))
}

module.exports = auth