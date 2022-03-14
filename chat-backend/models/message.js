'use strict';

const config = require("../config/app")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Chat, {foreignKey: "chatId"})
    }
  };
  Message.init({
    type: DataTypes.STRING,  // type tells us if the message is an img or string
    message: {  
      type: DataTypes.TEXT,
      get() {  //custom get method https://sequelize.org/master/manual/getters-setters-virtuals.html

        //return different content depending on if the type is a image or a text 

        const type = this.getDataValue("type")  
        const id = this.getDataValue("chatId")
        const content = this.getDataValue("message")

        return type === "text" ? content : `${config.appUrl}:${config.appPort}/chat/${id}/${content}`
      }
    },
    chatId: DataTypes.INTEGER,
    fromUserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};