const login = require('./login');
const selectOption = require('./selectOption');
const calculateScore = require('./calculateScore');
const getTopScore = require('./getTopScores');

module.exports = [].concat(login, selectOption, calculateScore, getTopScore);
