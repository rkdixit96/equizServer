const models = require('../../models');

module.exports = [{
  method: 'POST',
  path: '/calculateScore',
  handler: (request, response) => {
    models.answers.findAll().then((ans) => {
      models.useranswers.findAll({
        where: {
          userId: request.payload.userId,
        },
      }).then((userans) => {
        let score = 0;
        for (let ansInd = 0; ansInd < ans.length; ansInd += 1) {
          for (let userAnsInd = 0; userAnsInd < userans.length; userAnsInd += 1) {
            if (ans[ansInd].questionId === userans[userAnsInd].questionId) {
              if (ans[ansInd].answer === userans[userAnsInd].answer) {
                score += 1;
              }
            }
          }
        }
        models.users.update({ score }, {
          where: {
            id: request.payload.userId,
          },
        }).then(() => {
          response({
            statusCode: 201,
            score,
          });
        });
      });
    });
    // Compare useranswers to answers and if match increment score
    // Store score in userdatabase
  },
}];

