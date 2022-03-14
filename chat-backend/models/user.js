'use strict';

const bcrypt = require("bcrypt")
const config = require("../config/app")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Chat, { through: "ChatUser", foreignKey: "userId" })
      //i dont understand this line
      this.hasMany(models.ChatUser, { foreignKey: 'userId' })
      
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    avatar: {
      type: DataTypes.STRING,
      get() {  //custom get method https://sequelize.org/master/manual/getters-setters-virtuals.html
        
        //find what is currently assigned for Avatar field
        const avatar = this.getDataValue("avatar")
        //need url to access the Default Images
        const url = `${config.appUrl}:${config.appPort}`
        
        //if nothing is set -> use default male or female img
        if(!avatar){
          return `${url}/${this.getDataValue("gender")}Avatar.svg`
        }

        //else return the user's avatar
        const id = this.getDataValue("id")
        return `${url}/user/${id}/${avatar}`

      }
    }
  }, {
    sequelize,
    modelName: 'User',
    //hooks are functions which are called before and after calls in sequelize are executed
    hooks:{
      beforeCreate: hashPassword,
      afterCreate: hashPassword,
      beforeBulkUpdate: hashPasswordBulkUpdate,
      afterBulkUpdate: hashPasswordBulkUpdate
    }
  });
  return User;
};

const hashPassword = async (user) => {
  //login/register
  if(user.changed("password")){
    user.password = await bcrypt.hash(user.password, 10)
  }
  return user
}


const hashPasswordBulkUpdate = async (user) => {
  //update user
  if(user.attributes.password){
    user.attributes.password = await bcrypt.hash(user.attributes.password, 10)
  }
  return user
}

