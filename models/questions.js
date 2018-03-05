

module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    questionText: DataTypes.STRING,
    options: DataTypes.JSON,
  }, {});
  questions.associate = function (models) {
    models.questions.hasOne(models.answers, { as: 'answer' });
    models.questions.hasMany(models.useranswers, { as: 'useranswers' });
  };
  return questions;
};
