const router = require("express").Router()
const { index, create, messages, deleteChat } = require("../controllers/chatController")
//Middleware to check the JWT
const { auth } = require("../middleware/auth")

/*Best practice for RESTful API design is that path params are used to identify a specific resource or resources, while query parameters are used to sort/filter those resources*/

//the second param is an array of middlewares to be run
router.get("/", [auth], index)
router.get("/messages", [auth], messages)  //uses query params 
router.post("/create", [auth], create)
router.delete("/:id", [auth], deleteChat)  //uses path params

module.exports = router