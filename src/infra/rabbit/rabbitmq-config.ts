import { Channel, Connection, connect, Message } from "amqplib";

import { RabbitMQConfig } from "@/domain/interfaces/rabbit/rabbitmq-config";

export class RabbitMQ implements RabbitMQConfig {
  private conn?: Connection;
  private channel?: Channel;
  private connectionActive: boolean = false;

  constructor() {
    this.createConnection();
  }

  async createConnection(): Promise<void> {
    const uri = "amqp://guest:guest@localhost:5672";
    try {
      this.conn = await connect(uri);
      this.channel = await this.conn.createChannel();
      this.connectionActive = true;
      console.info("[RabbitMQ] - Connection created successfully");
    } catch (error) {
      console.error(`[RabbitMQ] - Failed to create a connection: ${error}`);
      this.connectionActive = false;
    }
  }

  async publishDataQueue(queue: string, data: any): Promise<boolean> {
    try {
      if (!this.connectionActive) {
        console.info("[RabbitMQ] - Could not send data to queue because connection is not active.");
        throw new Error("[RabbitMQ] - Could not send data to queue because connection is not active.");
      }

      this.channel?.assertQueue(queue);

      console.info(`[RabbitMQ] - Try to send message to ${queue}.`);
      return (await this.channel?.sendToQueue(queue, Buffer.from(JSON.stringify(data)))) ?? false;
    } catch (err: any) {
      console.error("[RabbitMQ] - Error while publishing data:", err);
      return false;
    }
  }

  async consumer(queue: string): Promise<void> {
    try {
      if (!this.connectionActive) {
        console.info("[RabbitMQ] - Could not receive data from the queue because the connection is not active.");
        throw new Error("[RabbitMQ] - Could not receive data from the queue because the connection is not active.");
      }

      this.channel?.consume(queue, (message: Message | null) => {
        if (message) {
          console.log(`Received message: ${message.content.toString()}`);
          this.channel?.ack(message);
        }
      });
    } catch (error) {
      console.error("[RabbitMQ] - Error while consuming data:", error);
    }
  }
}

/**
 * A Connection represents a real TCP connection to the message broker, whereas a Channel is a virtual connection (AMQP connection) inside it.
 * This way you can use as many (virtual) connections as you want inside your application without overloading the broker with TCP connections.
 */
