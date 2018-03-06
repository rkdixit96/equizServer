const server = require('../../source/server');

describe('Testing get topscore request', () => {
  test('Responds with 201 statusCode', (done) => {
    const options = {
      method: 'GET',
      url: '/getTopScores',

    };

    server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(200);
      done();
    });
  });
});

