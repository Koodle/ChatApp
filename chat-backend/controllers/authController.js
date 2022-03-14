const User = require("../models").User //need MODEL to find the user in DB //https://stackoverflow.com/questions/9901082/what-is-this-javascript-require
//What is the .User for?
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("../config/app")


exports.login = async (req, res) => {

    const {email, password} = req.body
    
    try{

        //const secret = require("crypto").randomBytes(64).toString("hex") use this to create a secret key & store in .env file
        
        //Find user
        const user = await User.findOne({
            where:{
                email: email
            }
        })
        
        //check if user found 
        if(!user){return res.status(404).json({message:"user not found"})}
        
        //check if password matches
        if(!bcrypt.compareSync(password, user.password)){return res.status(401).json({message: "Incorrect password!"})}  //401 is forbidden
        
        //generate auth token for user
        const userWithToken = generateToken(user.get({raw: true})) //.get({raw: true}) gives a plain JS object on which we can use BCRYPT
        /*
        -When sequelize returns a user, it is a sequelized instance/object of that model. 
        -Which will execute the custom getter/setter in the model. Sequelize will serialize the data automatically.
        -But because we used user.get({raw: true}) which returns a plain JS object. 
        -Which will not do the serialization & not execute the custom getter/setter created in the model
        -This is why we must set Avatar again
        */
        userWithToken.user.avatar = user.avatar  //will execute the Custom Getter in the userModel and assign return value

        console.log(`sequelized instance of user model's avatar: ${user}`)
        console.log(`plain js object to be sent to user: ${userWithToken}`)
        

        return res.send(userWithToken)

    }catch(e){
        return res.status(500).json({message: e.message}) //500 is internal server error
    }
}

exports.register = async (req, res) => {

    try{

        //create new user
        const user = await User.create(req.body)

        //generate auth token for user
        const userWithToken = generateToken(user.get({raw: true})) //.get({raw: true}) gives a plain JS object

        return res.send(userWithToken)

    }catch(e){
        return res.status(500).json({message: e.message}) //500 is internal server error
    }
    
}

const generateToken = (user) => { //https://www.youtube.com/watch?v=7Q17ubqLfaM
    delete user.password
    //jwt.sign(payload, secretKey, Options)
    const token = jwt.sign(user, config.appKey, {expiresIn: 86400})
    //combine the user with the token
    return {...{user}, ...{token}}  
}