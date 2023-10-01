import knex from "knex";
import * as knexConnection from './knexfile';

export class Connection {
    
    public db (tableName: string) {
       return knex(knexConnection)(tableName);
    }

    public async validateConnection() {
        this.db('event_01').then((response) => { 
            if (response) {
                console.info('[Ticket-service]-Connection with database was successfully!');
            }
        }).catch(error => {
            console.error('[Ticket-service]-Error in connection with database', error);
        })
    }
}

