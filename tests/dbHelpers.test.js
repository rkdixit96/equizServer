const DbHelpers = require('../source/dbHelpers');
const Models = require('../models');

describe('Testing database helper funcations', () => {
  beforeAll((done) => {
    Models.questions.deleteAllQuestions()
      .then(() => {
        Models.answers.deleteAllAnswers().then(() => {
          done();
        });
      }).catch();
  });

  test('Get options from questions returns options', () => {
    const question = {
      id: 12,
      questionText: 'What is the capital of India',
      option1: 'New Delhi',
      option2: 'MP',
      option3: 'UP',
      option4: 'Bangalore',
    };
    const expectedAnswer = [{ option1: 'New Delhi' },
      { option2: 'MP' },
      { option3: 'UP' },
      { option4: 'Bangalore' }];
    expect(DbHelpers.getOptionsFromQuestion(question)).toEqual(expectedAnswer);
  });

  test('Ensure questions in database', (done) => {
    DbHelpers.ensureDataInQuestionsDb().then(() => {
      Models.questions.count().then((count) => {
        expect(count).not.toBe(0);
        done();
      });
    });
  }, 10000);

  test('If already populated gives message populated', (done) => {
    DbHelpers.ensureDataInQuestionsDb().then(() => {
      DbHelpers.ensureDataInQuestionsDb().then((message) => {
        expect(message).toBe('Questions are in database');
        done();
      });
    });
  });

  test('Ensure answers in database', (done) => {
    Models.questions.deleteAllQuestions().then(() => {
      Models.answers.deleteAllAnswers().then(() => {
        DbHelpers.ensureDataInQuestionsDb().then((qstatus) => {
          DbHelpers.ensureDataInAnswersDb().then((astatus) => {
            // Models.answers.findAll().then((answers) => {
            expect(astatus).toBe('Answers added');
            done();
            // });
          });
        });
      });
    });
  }, 10000);

  test('If already populated gives message populated', (done) => {
    Models.questions.deleteAllQuestions().then(() => {
      Models.answers.deleteAllAnswers().then(() => {
        DbHelpers.ensureDataInQuestionsDb().then(() => {
          DbHelpers.ensureDataInAnswersDb().then(() => {
            DbHelpers.ensureDataInAnswersDb().then((message) => {
              expect(message).toBe('Answers already in table');
              done();
            });
          });
        });
      });
    });
  });
});
