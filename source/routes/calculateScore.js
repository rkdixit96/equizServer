const models = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/calculateScore',
  handler: (request, response) => {
    // Given userId
    // Compare useranswers to answers and if match increment score
    // Store score in userdatabase
    response({
      statusCode: 201,
    });
  },
}];

