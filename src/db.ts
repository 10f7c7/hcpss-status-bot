import { Sequelize } from 'sequelize'
import 'dotenv/config';

const db: Sequelize = new Sequelize({

  dialect: 'mysql',
  database: process.env.MYSQL_DB_NAME,
  username: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  host: process.env.MYSQL_DB_HOST,
  // port: parseInt(process.env.MYSQL_DB_PORT || '3306')
  // define: {
  //   underscored: true
  // }
})

export default db
