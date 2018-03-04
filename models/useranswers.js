

module.exports = (sequelize, DataTypes) => {
  const useranswers = sequelize.define('useranswers', {
    userId: DataTypes.INTEGER,
    questionId: DataTypes.INTEGER,
    answer: DataTypes.STRING,
  }, {});
  useranswers.associate = function (models) {
    models.useranswers.belongsTo(models.users, { as: 'user' });
    models.useranswers.belongsTo(models.questions, { as: 'question' });
  };
  return useranswers;
};
