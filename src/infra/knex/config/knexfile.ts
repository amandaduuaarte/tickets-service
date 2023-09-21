import { Knex } from "knex";

module.exports = {

    client:'mysql2',
    connection: {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      database: process.env.DATABASE_NAME || 'tickets-db',
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      port: parseInt('3306'),
    },
    pool: {
      min: 2,
      max: 10,
    },
  
}as Knex.Config;
