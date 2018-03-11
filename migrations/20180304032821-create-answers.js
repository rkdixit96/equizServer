/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('answers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    questionId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'questions',
        key: 'id',
      },
    },
    answer: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('answers'),
};
