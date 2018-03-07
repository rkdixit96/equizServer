const models = require('../../models');

const scoreCalculate = (ans, userans) => {
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
  return score;
};

module.exports = [{
  method: 'POST',
  path: '/calculateScore',
  handler: (request, response) => {
    const reqData = request.payload;
    models.answers.findAll().then((ans) => {
      models.useranswers.findAll({
        where: {
          userId: reqData.userId,
        },
      }).then((userans) => {
        const score = scoreCalculate(ans, userans);
        models.users.update({ score }, {
          where: {
            id: reqData.userId,
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

