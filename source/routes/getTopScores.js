const models = require('../../models');

module.exports = [{
  method: 'GET',
  path: '/getTopScores',
  handler: (request, response) => {
    // Get top 5 userNames based on score
    models.users.findAll({
      order: [
        ['score', 'DESC'],
      ],
      limit: 5,
    }).then((res) => {
      response({
        statusCode: 200,
        res,
      });
    });
  },
}];
