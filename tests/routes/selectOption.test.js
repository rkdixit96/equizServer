const server = require('../../source/server');
const models = require('../../models');

describe('Testing POST option request', () => {
  beforeAll((done) => {
    models.users.upsert({
      id: 999,
      userName: 'selectOptionUser',
    }).then(() => {
      done();
    }).catch();
  });

  afterAll((done) => {
    models.users.destroy({
      where: {
        userName: 'selectOptionUser',
      },
      truncate: true,
      cascade: true,
    }).then(() => {
      done();
    }).catch();
  });

  test('Responds with 201 statusCode', (done) => {
    const options = {
      method: 'POST',
      url: '/selectOption',
      payload: {
        userId: 999,
        questionId: 12,
        answer: 'New Delhi',
      },
    };
    server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(201);
      done();
    });
  }, 10000);
});
