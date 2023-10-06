const { DataSource } = require('typeorm');
const { User } = require('./src/user/user.entity');
const { EmailRetry } = require('./src/email-retry.entity');
require('dotenv').config();

const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, EmailRetry],
    synchronize: false, // Set to false when using migrations
    logging: true,
    migrations: ['src/migrations/*.ts'], // Add this line
});

module.exports = {
  dataSource, // Use the custom DataSource instance
  migrations: ['src/migrations/*.ts'], // Add this line
  cli: {
    migrationsDir: 'src/migrations', // And this line
  },
};