import { db } from "./config/connection";

export const validateDBConnection = () => {
    db('events').then((response) => { 
        if (response) {
            console.info('[Ticket-service]-Connection with database was successfully!');
        }
    }).catch(error => {
        console.error('[Ticket-service]-Error in connection with database', error);
    })
}