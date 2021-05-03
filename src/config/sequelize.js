const { config } = require('dotenv');

config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT,
    logging: !process.env.DATABASE_DEBUG,
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT,
    logging: !process.env.DATABASE_DEBUG,
  },
  staging: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT,
    logging: !process.env.DATABASE_DEBUG,
    dialectOptions: {
      ssl: true,
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DATABASE_DIALECT,
    logging: !process.env.DATABASE_DEBUG,
  },
};
