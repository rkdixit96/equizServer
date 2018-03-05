const models = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/selectOption',
  handler: (request, response) => {
    models.useranswers.upsert({
      userId: request.payload.userId,
      questionId: request.payload.questionId,
      answer: request.payload.answer,
    }).then((res) => {
      response({
        statusCode: 201,
      });
    });
    // Given userId, questionId and optionId
    // update useranswer in useranswwers table
  },
}];

