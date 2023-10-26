import express from "express";
import { Connection } from "@/infra/knex/config/connection";
import { eventPurchaseRouter, authRoute } from "./routes";
import dotenv from "dotenv";
import { RabbitMQ } from "@/infra/rabbit/rabbitmq-config";

dotenv.config();
const app = express();
const port = 3000;
const connection = new Connection();
const rabbitMQ = new RabbitMQ();
const router = express.Router();

connection.validateConnection();
rabbitMQ.createConnection();

app.use(express.json());

app.use("/api", router);
app.get("/api", (req, res) => res.status(200).json({ message: "OK" }));
app.use("/api", authRoute);
app.use("/api", eventPurchaseRouter);
app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
