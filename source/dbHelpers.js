const Helpers = require('./helpers');
const Constants = require('./constants');
const Models = require('../models');

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
  return Helpers.getDataFromURL(Constants.questionsURL).then((questionData) => {
    questionData.allQuestions.forEach((question) => {
      promiseArray.push(Models.questions.createQuestion(question, getOptionsFromQuestion(question)));
    });
    return Promise.all(promiseArray);
  });
};

const ensureDataInQuestionsDb = () => Models.questions.count().then((count) => {
  if (count === 0) {
    return populateQuestionsDb().then(() => 'Questions added to database');
  }
  return 'Questions are in database';
});

const populateAnswersDb = () => {
  const promiseArray = [];
  return Models.questions.findAll().then((res) => {
    res.forEach((element) => {
      Helpers.getDataFromURL(`${Constants.answersURL}/${element.id}`).then((answerData) => {
        promiseArray.push(Models.answers.createAnswer(element.id, answerData.answer));
      });
    });
    return Promise.all(promiseArray);
  });
};

const ensureDataInAnswersDb = () => Models.answers.count().then((count) => {
  if (count === 0) {
    return populateAnswersDb().then(() => 'Answers added');
  }
  return 'Answers already in table';
});

const upsertUser = (userName) => {
  let userStatus = '';
  return Models.users.createOrCheckUser(userName).spread((user, userResult) => {
    if (userResult) {
      userStatus = 'New user created';
    } else {
      userStatus = 'User already exists';
    }
    return userStatus;
  });
};


const getUserAnswers = userName => Models.users.findAll({
  where: {
    userName,
  },
  include: [{
    model: Models.useranswers,
    as: 'answers',
  }],
}).then(res => res);

module.exports = {
  ensureDataInQuestionsDb, ensureDataInAnswersDb, upsertUser, getUserAnswers, getOptionsFromQuestion,
};

