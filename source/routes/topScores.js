const models = require('../../models');
const seqeulize = require('sequelize');

const { Op } = seqeulize;

module.exports = [{
  method: 'GET',
  path: '/topScores',
  handler: (request, response) => {
    // Get top 5 userNames based on score
    models.users.findAll({
      where: {
        score: { [Op.ne]: null },
      },
      order: [
        ['score', 'DESC'],
      ],
    }).then((res) => {
      const topScores = res.slice(0, 5);
      response({
        statusCode: 200,
        topScores,
      });
    });
  },
}];
