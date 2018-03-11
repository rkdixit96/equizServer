const login = require('./login');
const selectOption = require('./selectOption');
const calculateScore = require('./calculateScore');
const topScores = require('./topScores');

module.exports = [].concat(login, selectOption, calculateScore, topScores);
