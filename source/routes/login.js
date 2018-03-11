const Joi = require('joi');

const Models = require('../../models');
const DbHelpers = require('../dbHelpers');

module.exports = [{
  method: 'POST',
  path: '/login',
  handler: (request, response) => {
    DbHelpers.ensureDataInQuestionsDb().then((questionDbStatus) => {
      DbHelpers.ensureDataInAnswersDb().then((answerDbStatus) => {
        DbHelpers.upsertUser(request.payload.userName).then((userStatus) => {
          Models.questions.findAll().then((questions) => {
            DbHelpers.getUserAnswers(request.payload.userName).then((userAnswers) => {
              response({
                statusCode: 201,
                questionDbStatus,
                answerDbStatus,
                userStatus,
                questions,
                userAnswers,
              });
            });
          });
        });
      });
    });
    // Check if data in database
    // If not populate database
    // Check if answers are in database
    // if not populate database
    // Check if user exists
    // if not create user and send questions
    // if exists send questions and user options
  },
  config: {
    validate: {
      payload: {
        userName: Joi.string().alphanum().min(3).max(30)
          .required(),
      },
    },
  },
}];
