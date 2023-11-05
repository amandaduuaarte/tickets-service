import express from "express";
import dotenv from "dotenv";
import { Connection } from "@/infra/knex/config/connection";

import { eventPurchaseRouter, authRoute, createEventRouter } from "./routes";

import { RabbitMQ } from "@/infra/rabbit/rabbitmq-config";

dotenv.config();

const app = express();
const port = 3000;
const connection = new Connection();
const rabbitMq = new RabbitMQ();
const router = express.Router();

rabbitMq.createConnection();
connection.validateConnection();

app.use(express.json());

app.use("/api", router);
app.get("/api", (req, res) => res.status(200).json({ message: "OK" }));
app.use("/api", authRoute);
app.use("/api", eventPurchaseRouter);
app.use("/api", createEventRouter);

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
