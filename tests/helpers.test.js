const helpers = require('../source/helpers');
const constants = require('../source/constants');

describe('Testing helpers', () => {
  test('Get data from https url', (done) => {
    helpers.getDataFromURL(`${constants.answersURL}/23`).then((data) => {
      const dataJSON = JSON.parse(data);
      expect(dataJSON.answer).toBe('Kabul');
    });
    done();
  });
});
