import { Model } from 'sequelize';
import { hashPassword, verifyPassword } from '../helpers/auth';

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {}
  }

  user.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'user',
    underscored: true,
  });

  /**
   * @description a hook that is executed before user object is created
   * @method beforeCreate
   */
  user.beforeCreate(async (users) => {
    users.password = await users.generatePasswordHash();
  });

  /**
   * @description a hook that is executed before user object is updated
   * @method beforeUpdate
   */
  user.beforeUpdate(async (data) => {
    if (data.changed('password')) data.password = await data.generatePasswordHash();
  });

  /**
   * @description returns user object based on specified column
   * @method getExisting
   *
   * @param {String} queryString
   * @param {String} column
   *
   * @returns {Object}
   */
  user.getExisting = async (queryString, column = 'email') => {
    const data = await user.findOne({ where: { [column]: queryString } });
    return data;
  };

  /**
   * @description compares password
   * @function validatePassword
   *
   * @param {String} password
   *
   * @returns {Boolean}
   */
  user.prototype.validatePassword = function validatePassword(password) {
    return verifyPassword(this.password, password);
  };

  /**
   * @description hashes password before saving to the database
   * @function generatePasswordHash
   *
   * @returns {String}
   */
  user.prototype.generatePasswordHash = async function generatePasswordHash() {
    const password = await hashPassword(this.password);
    return password;
  };

  /**
   * @description serializer for user object
   * @function toJSON
   *
   * @returns {Object}
   */
  user.prototype.toJSON = function toJSON() {
    const { password, createdAt, updatedAt, ...safeData } = this.get();
    return safeData;
  };

  return user;
};
