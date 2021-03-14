import { Sequelize, DataTypes } from 'sequelize';

export const User = ( sequelize: Sequelize ) => {
  return sequelize.define('user', {
    id: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    phoneNumber : DataTypes.STRING,
    birthday: DataTypes.DATE,
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    hashinTechnique: DataTypes.STRING,
    userType: DataTypes.INTEGER,
    photoFileName: DataTypes.STRING,
  });
}