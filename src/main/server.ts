import express from 'express';
import { Connection } from '@/infra/knex/config/connection';

const app = express();
const port = 3000;
const connection = new Connection();

connection.validateConnection();

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
