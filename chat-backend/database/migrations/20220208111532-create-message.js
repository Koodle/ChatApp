'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {  // type to specify if message is "text" or "image"
        type: Sequelize.STRING,
        defaultValue: "text"
      },
      message: {
        type: Sequelize.TEXT
      },
      chatId: {
        type: Sequelize.INTEGER,
        //required field
        allowNull: false,
        //specify how the foreign key is connected
        references: {
          model: "Chats",
          key: "id"
        },
        //What happens when parent is deleted... no orphans
        //if we delete chat -> delete rows in this table
        onDelete: "CASCADE"
      },
      fromUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",  // todo User or Users
          key: "id"
        },
        onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()")
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Messages');
  }
};