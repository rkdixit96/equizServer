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

const populateQuestionsDb = () => {
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

const populateAnswersDb = () => {
  const promiseArray = [];
  return models.questions.findAll().then((res) => {
    res.forEach((element) => {
      helpers.getDataFromURL(`${constants.answersURL}/${element.id}`).then((data) => {
        const createPromise = models.answers.create({
          questionId: element.id,
          answer: data.answer,
        });
        promiseArray.push(createPromise);
      });
    });
    return Promise.all(promiseArray);
  });
};

const upsertUser = (userName) => {
  let userStatus = '';
  return models.users.upsert({
    userName,
  }).then((userResult) => {
    if (userResult) {
      userStatus = 'New user created';
    } else {
      userStatus = 'User already exists';
    }
    return userStatus;
  });
};

const ensureDataInQuestionsDb = () => models.questions.findAll().then((result) => {
  if (result.length === 0) {
    populateQuestionsDb().then(() => 'Questions added to database');
  } else {
    console.log('this si stest');
    return 'Questions are in database';
  }
});

const ensureDataInAnswersDb = () => models.answers.findAll().then((ans) => {
  if (ans.length === 0) {
    populateAnswersDb().then(() => 'Answers added');
  } else {
    return 'Answers already in table';
  }
});


const getUserAnswers = userName => models.users.findAll({
  where: {
    userName,
  },
  include: [{
    model: models.useranswers,
    as: 'answers',
  }],
}).then(res => res);

// .then is not a function
// const getQuestions = () => models.questions.findAll().then(result => result);

module.exports = [{
  method: 'POST',
  path: '/login',
  handler: (request, response) => {
    ensureDataInQuestionsDb().then((questionDbStatus) => {
      ensureDataInAnswersDb().then((answerDbStatus) => {
        upsertUser(request.payload.userName).then((userStatus) => {
          models.questions.findAll().then((questions) => {
            getUserAnswers(request.payload.userName).then((res) => {
              response({
                statusCode: 201,
                questionDbStatus,
                answerDbStatus,
                userStatus,
                questions,
                res,
              });
            });
          });
        });
      });
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


// models.questions.findAll().then((result) => {
//   if (result.length === 0) {
//     populateQuestionsDb().then((questionsVals) => {
//       upsertUser(request.payload.userName).then((userStatus) => {
//         response({
//           statusCode: 201,
//           userStatus,
//         });
//       });
//     });
//   }
// });
