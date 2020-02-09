'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      task_id: {
        type: Sequelize.STRING
      },
      customer_first_name: {
        type: Sequelize.STRING
      },
      personnel_first_name: {
        type: Sequelize.STRING
      },
      customer_last_name: {
        type: Sequelize.STRING
      },
      customer_phone: {
        type: Sequelize.STRING
      },
      agentId: {
        type: Sequelize.INTEGER
      },
      assigned: {
        type: Sequelize.DATE
      },
      in_progress: {
        type: Sequelize.DATE
      },
      completed: {
        type: Sequelize.DATE
      },
      deferred: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      access_code: {
        type: Sequelize.INTEGER
      },
      splash_page: {
        type: Sequelize.INTEGER
      },
      mpesa: {
        type: Sequelize.INTEGER
      },
      autoplay: {
        type: Sequelize.INTEGER
      },
      comments: {
        type: Sequelize.STRING
      },
      registration: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks');
  }
};