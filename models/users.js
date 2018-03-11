module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userName: DataTypes.STRING,
    score: DataTypes.STRING,
  }, {});

  users.associate = function (models) {
    models.users.hasMany(models.useranswers, { as: 'answers' });
  };

  users.createOrCheckUser = userName => users.findOrCreate({
    where: { userName },
  });

  users.deleteAllUsers = () => users.destroy({ cascade: true, truncate: true });

  return users;
};
