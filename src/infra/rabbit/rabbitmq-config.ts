import { RabbitMQConfig } from "@/domain/interfaces/rabbit/rabbitmq-config";
import { Channel, Connection, connect } from "amqplib";

export class RabbitMQ implements RabbitMQConfig {
  private conn?: Connection;
  private channel?: Channel;
  private connectionActive: boolean = false;

  constructor() {}
  async createConnection(queue: string): Promise<void> {
    const uri = "amqp://guest:guest@localhost:5672";
    try {
      this.conn = await connect(uri);
      console.info("[RabbitMQ] - Connection created successfully");
      this.connectionActive = true;

      if (this.conn) {
        this.channel = await this.conn.createChannel();
        console.info("[RabbitMQ] - Channel created successfully");

        await this.channel.assertQueue(queue);
      } else {
        console.error("[RabbitMQ] - Could not create a channel.");
      }
    } catch (error) {
      console.error(`[RabbitMQ] - Failed to create a connection: ${error}`);
    }
  }

  async publishDataQueue(queue: string, data: any): Promise<boolean> {
    console.log("aquiii", this.connectionActive);
    // send data to queue
    if (!this.connectionActive) {
      console.info("[RabbitMQ] - Could not send data to queue because connection is not active.");
      throw new Error("[RabbitMQ] - Could not send data to queue because connection is not active.");
    }
    console.info(`[RabbitMQ] - Try to send message to ${queue}.`);
    return (await this.channel?.sendToQueue(queue, Buffer.from(JSON.stringify(data)))) ?? false;
  }

  async consumer(queue: string) {
    try {
      if (!this.connectionActive) {
        console.info("[RabbitMQ] - Could not send data to queue because connection is not active.");
        throw new Error("[RabbitMQ] - Could not send data to queue because connection is not active.");
      }

      this.channel?.consume(queue, (data: any) => {
        console.log(`${Buffer.from(data.content)}`);
        this.channel?.ack(data);
      });
    } catch {
      if (!this.connectionActive) {
        console.info("[RabbitMQ] - Could not recive data to queue.");
        throw new Error("[RabbitMQ] - Could not recive data to queue.");
      }
    }
  }
}

/**
 * A Connection represents a real TCP connection to the message broker, whereas a Channel is a virtual connection (AMQP connection) inside it.
 * This way you can use as many (virtual) connections as you want inside your application without overloading the broker with TCP connections.
 */
