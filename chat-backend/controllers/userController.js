const User = require("../models").User
const sequelize = require("sequelize")

exports.update = async (req, res) => {

    //assign avatar's fileName to the req.body, from where multer has stored it
    if (req.file){
        req.body.avatar = req.file.filename
    }
    
    //to stop avatar from being reset if we didn't update it/didn't pass it to the body of the request
    if( typeof req.body.avatar !== "undefined" && req.body.avatar.length === 0 ){
        delete req.body.avatar
    }

    try{//update the Database
        const [rows, result] = await User.update(
            //update to be made
            req.body,
            {   //which users to update
                where: { 
                    id: req.user.id 
                },
                //will return an array of number of users effected & the users themselves
                returning: true,
                //bulk operations like User.update dont execute hooks on the model, since it will limit performance, so we must tell it to do so!
                individualHooks: true
            }
        )

        //get user data
        const user = result[0].get({raw: true})  //get plain JS object from sequelize object
        user.avatar = result[0].avatar  
        delete user.password

        console.log("usercontroller response", user)

        return res.send(user)

    }catch(e){
        
        return res.status(500).json({error: e.message}) // Internal Server Error
    }
}