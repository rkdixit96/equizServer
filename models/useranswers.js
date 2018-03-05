

module.exports = (sequelize, DataTypes) => {
  const useranswers = sequelize.define('useranswers', {
    userId: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex',
    },
    questionId: {
      type: DataTypes.INTEGER,
      unique: 'compositeIndex',
    },
    answer: DataTypes.STRING,
  }, {});
  useranswers.associate = function (models) {
    models.useranswers.belongsTo(models.users, { as: 'user' });
    models.useranswers.belongsTo(models.questions, { as: 'question' });
  };
  return useranswers;
};
