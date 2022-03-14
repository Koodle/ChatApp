// use sequelize model to create new records
const models = require("../models")
const User = models.User
const Chat = models.Chat
const ChatUser = models.ChatUser
const Message = models.Message

// constraints from sequelize to use conditionals 
const { Op } = require("sequelize")
const { sequelize } = require("../models")

/*return all chats for the user*/
exports.index = async (req, res) => {

    console.log("req.user.id");
    console.log(req.user.id);

    // grab specific user
    const user = await User.findOne({
        Where: {
            id: req.user.id
        },
        // include all chats for this user
        include: [ 
            {
                model: Chat,
                include: [
                    //for each chat include all users
                    {
                        model: User,
                        //but dont grab the current user
                        where: {
                            [Op.not]: {  // grab all users where not current user
                                id: req.user.id
                            }
                        }
                    },
                    //for each chat include messages
                    {
                        model: Message, 
                        limit: 20,  // only return 20 messages for speed
                        order: [["id", "DESC"]]  // return most recent
                    }
                ]
            }
        ]
    })
    console.log("user.chats");
    console.log(user.Chats);
    return res.json(user.Chats)
}

/*create a new chat*/
exports.create = async (req, res) => {

    //ID of the other user in this new chat
    const {partnerId} = req.body

    //use sequelize transactions in order to use ACID feature of RDMS
    const t = await sequelize.transaction()

    //check if the two users already have a chat
    try{

        console.log("grabbing new user");

        //TODO CODE FAILS HERE

        //grab the current user
        const user = await User.findOne({
            where: {
                id: req.user.id
            },
            include: [ 
                /**
                 * TODO: NOT WORKING
                 * **/
                //include the user's chats
                {
                    model: Chat,
                    //only dual chats!
                    where: {
                        type: "dual"
                    },
                    //for each dual chat that the current user is linked to -> include ChatUser join table 
                    include: [
                        {
                            model: ChatUser,
                            //find the chat which has the partnersID 
                            where: {
                                userId: partnerId
                            }
                        }
                    ]
                }
            ]
        })

        console.log("checking for existing chat");

        //if this returns a result -> users have an existing chat
        if (user && user.Chats.length > 0){ 
            return res.status(403).json({status: "error", message: "Chat with this user already exists"})
        }

        //create a new chat
        const chat = await Chat.create({type: "dual"}, {transaction: t})  //add transaction option to use ACID

        console.log("created new chat");

        //create a new chatUser
        await ChatUser.bulkCreate([ // bulkCreate allows us to create multiple instances at a time   
            {
            chatId: chat.id,
            userId: req.user.id
            },
            {
            chatId: chat.id,
            userId: partnerId
            }
        ], { transaction: t })

        console.log("created new chatUser");

        //if all ACID transactions were successful -> commit the transaction (save the data)
        await t.commit()

        //grab the new chat
        const chatNew = await Chat.findOne({
            where: {
                id: chat.id
            },
            include: [
                //for each chat include all users
                {
                    model: User,
                    //but dont grab the current user
                    where: {
                        [Op.not]: {  // grab all users where not current user
                            id: req.user.id
                        }
                    }
                },
                //for each chat include messages
                {
                    model: Message, 
                }
            ]
        })

        return res.json(chatNew)

    }catch (e) {
        //if all ACID transactions were unsuccessful -> cancel changes
        await t.rollback()
        
        return res.status(500).json({ status: "Error", message: e.message }) //500 internal server error
    }   
}

/*Message pagination (number each message in a chat)*/
exports.messages = async (req, res) => {
        
    const limit = 10  //how many messages to return per page
    const page = req.query.page || 1  
    const offset = page > 1 ? page * limit : 0  //how many messages to skip (if we change page)

    const messages = await Message.findAndCountAll({
        where: {
            chatId: req.query.id
        },
        offset: offset,
        limit: limit
    })

    const totalPages = Math.ceil(messages.count / limit)
    
    //todo NOT SURE WHAT THIS IF STATEMENT IS FOR?
    if (page > totalPages) return res.json({ data: { messages: [] } })

    const result = {
        messages: messages.rows,
        pagination: {
            page,
            totalPages
        }
    }
    return res.json(result)
}

/*delete a chat*/
exports.deleteChat = async (req, res) => {

    try {

        await Chat.destroy({
            where: {
                id: req.params.id
            }
        })

        return res.json({ status: "Success", message: "Chat deleted successfully" })

    } catch (e) {
        return res.status(500).json({ status: "Error", message: e.message })
    }
}