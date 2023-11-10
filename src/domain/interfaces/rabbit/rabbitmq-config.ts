
export interface RabbitMQConfigInterface {
  createConnection: (queue: string) => Promise<void>;
  publishDataQueue: (queue: string, data: any) => Promise<boolean>;
  consumer: (queue: string) => Promise<void>;
}
