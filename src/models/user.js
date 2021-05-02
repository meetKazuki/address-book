import { Model } from 'sequelize';
import { hashPassword, verifyPassword } from '../helpers/auth';

export default (sequelize, DataTypes) => {
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
   * @description serializer for user object
   * @function toJSON
   *
   * @returns {Object}
   */
  user.prototype.toJSON = function toJSON() {
    const { password, ...safeData } = this.get();
    return safeData;
  };

  /**
   * @description hashes password before saving to the database
   * @function generatePasswordHash
   *
   * @returns {String}
   */
  user.generatePasswordHash = async function generatePasswordHash() {
    const password = await hashPassword(this.password);
    return password;
  };

  /**
   * @description compares password
   * @function validatePassword
   *
   * @param {String} password
   * @returns {Boolean}
   */
  user.validatePassword = async function validatePassword(password) {
    return verifyPassword(this.password, password);
  };

  return user;
};
