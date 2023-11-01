import express from "express";
import { Connection } from "@/infra/knex/config/connection";
import { eventPurchaseRouter, authRoute } from "./routes";
import dotenv from "dotenv";

import { SendEmailWorker } from "@/infra/rabbit/workers/send-email-worker";
import { Nodemailer } from "@/infra/nodemailer/config";

dotenv.config();

const app = express();
const port = 3000;
const connection = new Connection();

const sendEmailWorker = new SendEmailWorker(new Nodemailer());

const router = express.Router();

connection.validateConnection();

setTimeout(() => {
  sendEmailWorker.consumerQueue("email-notification");
}, 1000);

app.use(express.json());

app.use("/api", router);
app.get("/api", (req, res) => res.status(200).json({ message: "OK" }));
app.use("/api", authRoute);
app.use("/api", eventPurchaseRouter);
app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
