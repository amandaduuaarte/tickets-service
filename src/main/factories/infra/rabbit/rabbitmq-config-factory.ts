import { RabbitMQConfigInterface } from "@/domain/interfaces/rabbit/rabbitmq-config";
import { RabbitMQ } from "@/infra/rabbit/rabbitmq-config";

export const RabbitMQFactory = (): RabbitMQConfigInterface => {
  return new RabbitMQ();
};
