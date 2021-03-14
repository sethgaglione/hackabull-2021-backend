import { Sequelize, DataTypes } from 'sequelize';

const sequelize: Sequelize = new Sequelize('');

export const User = sequelize.define('user', {
  id: DataTypes.INTEGER,
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  email: DataTypes.STRING,
  userName: DataTypes.STRING,
  phoneNumber : DataTypes.STRING,
  birthday: DataTypes.STRING,
  password: DataTypes.STRING,
  salt: DataTypes.STRING,
  hashinTechnique: DataTypes.STRING,
  userType: DataTypes.INTEGER,
  photoFileName: DataTypes.STRING,
});