import knex from "knex";
import * as knexConnection from "../../../knex/config/knexfile";

import { CreateEvent } from "@/domain/interfaces";
import { CreateEventRepositoryInterface } from "@/domain/interfaces/repositories/create-event-repository";
import { Connection } from "../../config";

export class CreateEventRepository implements CreateEventRepositoryInterface {
  constructor() {}

  async createEvent(data: CreateEvent.CreateEventParams): Promise<void> {
    try {
      console.info(`[createEvent]: Trying create event table.`);
      const newRow = {
        title: data.name,
        description: data.description,
        owner: data.owner,
        place: data.place,
        type: data.type,
        tickets_quantity: data.ticket_quantity,
        event_config: data.event_config,
        date: data.date,
        pista: data.pista,
        front: data.front,
        vip: data.vip,
      };
      const config = new Connection();
      return await config
        .db("event_01")
        .insert(newRow)
        .then(() => {
          console.info(`[createEvent]: Event table create successfully}.`);
        })
        .catch((error) => {
          console.error(`[createEvent-error]: ${error.message}`);
        });
    } catch (err: any) {
      console.error(`[createEvent]: ${err.message}`);
      throw new Error("Os dados não foram salvos.");
    }
  }

  async dropEvent(data: CreateEvent.CreateEventParams) {
    try {
      console.info(`[createEvent]: Trying drop event table.`);
      return knex(knexConnection).schema.dropTable(`event_${data.name}`);
    } catch (err: any) {
      console.error(`[createEvent]: ${err.message}`);
      throw new Error("Os dados não foram removidos.");
    }
  }
}
