module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    questionText: DataTypes.STRING,
    options: DataTypes.JSON,
  }, {});
  questions.associate = function (models) {
    // models.questions.belongsTo(models.answers, { as: 'answer' });
    // models.questions.hasMany(models.useranswers, { as: 'useranswers' });
  };

  questions.createQuestion = (question, options) => questions.create({
    questionText: question.question,
    id: question.questionId,
    options,
  });

  questions.deleteAllQuestions = () => questions.destroy({ cascade: true, truncate: true });

  return questions;
};
