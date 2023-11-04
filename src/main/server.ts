import express from "express";
import dotenv from "dotenv";
import { Connection } from "@/infra/knex/config/connection";
import { Nodemailer } from "@/infra/nodemailer/config";

import { eventPurchaseRouter, authRoute, createEventRouter } from "./routes";
import { SendEmailWorker } from "@/infra/rabbit/workers/send-email-worker";
import { RabbitMQ } from "@/infra/rabbit/rabbitmq-config";

dotenv.config();

const app = express();
const port = 3000;
const connection = new Connection();
const rabbitMq = new RabbitMQ();

const sendEmailWorker = new SendEmailWorker(new Nodemailer());

const router = express.Router();

rabbitMq.createConnection();
connection.validateConnection();

setTimeout(() => {
  sendEmailWorker.consumerQueue("email-notification");
}, 1000);

app.use(express.json());

app.use("/api", router);
app.get("/api", (req, res) => res.status(200).json({ message: "OK" }));
app.use("/api", authRoute);
app.use("/api", eventPurchaseRouter);
app.use("/api", createEventRouter);

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
