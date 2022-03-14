const {validationResult} = require("express-validator")

exports.validate = (req, res, next) => {
    //validate form
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}) //400 Bad Request (client error)
    }
    next()
}