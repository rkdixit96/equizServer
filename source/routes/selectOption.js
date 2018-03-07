const models = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/selectOption',
  handler: (request, response) => {
    const reqData = request.payload;
    models.useranswers.upsert({
      userId: reqData.userId,
      questionId: reqData.questionId,
      answer: reqData.answer,
    }).then((res) => {
      response({
        statusCode: 201,
      });
    });
    // Given userId, questionId and optionId
    // update useranswer in useranswwers table
  },
}];

