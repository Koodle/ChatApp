'use strict';

//use sequelize model to create new records
const models = require("../../models")
const User = models.User
const Chat = models.Chat
const ChatUser = models.ChatUser
const Message = models.Message

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    //find 2 users
    const users = await User.findAll({ limit: 2 })

    //create a chat
    const chat = await Chat.create()

    //create chatUser join table
    await ChatUser.bulkCreate([ // bulkCreate allows us to create multiple instances at a time   
      {
        chatId: chat.id,
        userId: users[0].id
      },
      {
        chatId: chat.id,
        userId: users[1].id
      }
    ])
  
    //create some messages
    await Message.bulkCreate([
      {
        message: "hello friend",
        chatId: chat.id,
        fromUserId: users[0].id
      },
      {
        message: "hi there",
        chatId: chat.id,
        fromUserId: users[1].id
      },
      {
        message: "Wanna play some Rocket League?",
        chatId: chat.id,
        fromUserId: users[0].id
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
