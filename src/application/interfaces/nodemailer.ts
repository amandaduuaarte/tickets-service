import { MailOptions } from "@/domain/interfaces/rabbit/workers/send-email-worker";

export interface NodemailerInterface {
  config(data: MailOptions): void;
}
