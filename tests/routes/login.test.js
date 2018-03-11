const server = require('../../source/server');
const models = require('../../models');

describe('Testing POST user request', () => {
  beforeAll((done) => {
    models.users.deleteAllUsers().then(() => {
      models.users.createOrCheckUser('genericUsername')
        .then(() => {
          done();
        }).catch();
    });
  });

  afterAll((done) => {
    models.users.destroy({
      where: { userName: 'CrazyUniqueUserName' },
      truncate: true,
      cascade: true,
    }).then(() => {
      done();
    }).catch();
  });

  test('Responds with message new user created', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        userName: 'CrazyUniqueUserName',
      },
    };
    server.inject(options, (response) => {
      expect(response.result.userStatus).toBe('New user created');
      done();
    });
  });

  test('Responds with message user already exists for old user', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        userName: 'genericUsername',
      },
    };
    server.inject(options, (response) => {
      expect(response.result.userStatus).toBe('User already exists');
      done();
    });
  });

  test('Responds with 400 statusCode for payload with no userName', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Responds with 400 statusCode for empty/short username', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        userName: 'g',
      },
    };
    server.inject(options, (response) => {
      expect(response.statusCode).toBe(400);
      done();
    });
  });

  test('Responds with 201 statusCode', (done) => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        userName: 'genericUsername',
      },
    };
    server.inject(options, (response) => {
      expect(response.result.statusCode).toBe(201);
      done();
    });
  });

  test('Questions database gets populated after call', () => {
    const options = {
      method: 'POST',
      url: '/login',
      payload: {
        userName: 'genericUsername',
      },
    };
    server.inject(options, (response) => {
      if (response.result.statusCode === 201) {
        models.questions.count().then((count) => {
          expect(count).toBeGreaterThan(0);
        });
      }
    });
  });
});
