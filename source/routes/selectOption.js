module.exports = [{
  method: 'POST',
  path: '/selectOption',
  handler: (request, response) => {
    // Given username, questionId and optionId
    // update useranswer in useranswwers table
    response({
      statusCode: 201,
    });
  },
}];

