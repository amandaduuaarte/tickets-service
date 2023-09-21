import knex from "knex";
import * as knexConnection from './knexfile';

export const db = knex(knexConnection);

