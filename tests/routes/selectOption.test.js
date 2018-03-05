const server = require('../../source/server');

describe('Testing POST option request', () => {
  test('Responds with 201 statusCode', (done) => {
    const options = {
      method: 'POST',
      url: '/selectOption',
      payload: {
        userName: 'genericUsername',
        questionId: 12,
        answer: 'New Delhi',
      },
    };

    server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(201);
      done();
    });
  });
});
