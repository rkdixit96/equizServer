

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userName: DataTypes.STRING,
    score: DataTypes.STRING,
  }, {});
  users.associate = function (models) {
    models.users.hasMany(models.useranswers, { as: 'answers' });
  };
  return users;
};
