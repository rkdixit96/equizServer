module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('useranswers', ['userId', 'questionId'], {
      type: 'unique',
      name: 'unique_combo_constraint',
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeConstraint('useranswers', 'unique_combo_constraint');
  },
};
