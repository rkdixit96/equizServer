const Joi = require('joi');

const models = require('../../models');
const helpers = require('../helpers');
const constants = require('../constants');

const getOptionsFromQuestion = (question) => {
  const options = [];
  const keyArray = Object.keys(question);
  keyArray.forEach((key) => {
    if (/^option/.test(key)) {
      const optionObj = {};
      optionObj[key] = question[key];
      options.push(optionObj);
    }
  });
  return options;
};

const populateDb = () => {
  const promiseArray = [];
  return helpers.getDataFromURL(constants.questionsURL).then((data) => {
    data.allQuestions.forEach((question) => {
      const createPromise = models.questions.create({
        questionText: question.question,
        id: question.questionId,
        options: getOptionsFromQuestion(question),
      });
      promiseArray.push(createPromise);
    });
    return Promise.all(promiseArray);
  });
};

module.exports = [{
  method: 'POST',
  path: '/login',
  handler: (request, response) => {
    let message = '';
    models.questions.findAll().then((result) => {
      if (result.length === 0) {
        populateDb().then((values) => {
          message += 'Questions added to database \n';
          models.users.upsert({
            userName: request.payload.userName,
          }).then((userResult) => {
            if (userResult) {
              message += 'New user created';
            } else {
              message += 'User already exists';
            }
            response({
              statusCode: 201,
              message,
            });
          });
        });
      }
    });


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
