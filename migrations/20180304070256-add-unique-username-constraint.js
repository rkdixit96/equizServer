/* eslint-disable */
module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('users', ['userName'], {
      type: 'unique',
      name: 'username_unique',
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('users', 'username_unique');
  },
};
