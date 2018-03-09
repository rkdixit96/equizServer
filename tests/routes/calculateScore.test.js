const server = require('../../source/server');

describe('Testing POST calulateScore request', () => {
  test('Responds with 201 statusCode', (done) => {
    const options = {
      method: 'POST',
      url: '/calculateScore',
      payload: {
        userId: 999,
      },
    };

    server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(201);
      done();
    });
  }, 20000);
});

// Thought of upserting all correct options in a before all and checking if score calculation happens
// since it will be dependent on data decided not do it
