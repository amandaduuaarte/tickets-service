import express from 'express';
import { validateDBConnection } from '@/infra/knex/validateConnection';

const app = express();
const port = 3000;

validateDBConnection();

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
