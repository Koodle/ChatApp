const router = require("express").Router()
const { update } = require("../controllers/userController")
//Middleware to check the JWT
const { auth } = require("../middleware/auth")
//validation
const {rules: updateRules} = require("../validators/user/update")
//To check for any errors in the array returned from updateRules
const { validate } = require("../validators")
//upload files
const {userFile} = require("../middleware/fileUpload")


//the second param is an array of middlewares to be run
router.post("/update", [auth, updateRules, validate, userFile], update)

module.exports = router