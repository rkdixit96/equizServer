const login = require('./login');
const selectOption = require('./selectOption');
const calculateScore = require('./calculateScore');

module.exports = [].concat(login, selectOption, calculateScore);
