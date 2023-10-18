import { BadRequestException } from "@/application/errors/errorExpection";
import { RabbitMQConfig } from "../interfaces/rabbit/rabbitmq-config";
import { BAD_REQUEST } from "@/application/constants";

export class PublishPurchaseQueue {
  constructor(readonly rabbitMQ: RabbitMQConfig) {
    this.rabbitMQ = rabbitMQ;
  }

  async publishOnQueue(queue: string, data: any) {
    try {
      if (!data) {
        console.error(`[PublishPurchaseQueue-Service]: Data was not provided.`);
        throw new BadRequestException("O conteúdo deve ser informado.", BAD_REQUEST);
      }
      console.info(`[PublishPurchaseQueue-Service]: Try to publish on queue ${queue}`);
      const publish = await this.rabbitMQ.publishDataQueue(queue, data);
      console.info(`[PublishPurchaseQueue-Service]: ${publish}`);
    } catch (err) {
      // Trativa de erro bem mais acertiva
      console.error(`[PublishPurchaseQueue-Service]: Error publishing on queue ${queue}`, err);
    }
  }
}
