const {body} = require("express-validator")

//will add an arrray to the request object with any errors under the name Express-validator
exports.rules = (() => { //self invoked function
    return [
        body("email").isEmail()
    ]
})()