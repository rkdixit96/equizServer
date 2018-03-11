module.exports = (sequelize, DataTypes) => {
  const answers = sequelize.define('answers', {
    questionId: DataTypes.INTEGER,
    answer: DataTypes.STRING,
  }, {});

  answers.associate = function (models) {
    // models.answers.belongsTo(models.questions, { as: 'question' });
  };

  answers.createAnswer = (questionId, answer) => answers.create({
    questionId,
    answer,
  });

  answers.deleteAllAnswers = () => answers.destroy({ cascade: true, truncate: true });


  return answers;
};
