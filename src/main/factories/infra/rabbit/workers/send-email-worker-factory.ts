import { SendEmailWorkerInterface } from "@/domain/interfaces/rabbit/workers/send-email-worker";
import { SendEmailWorker } from "@/infra/rabbit/workers/send-email-worker";

import { Nodemailer } from "@/infra/nodemailer/config";

export const SendEmailWorkerFactory = (): SendEmailWorkerInterface => {
  return new SendEmailWorker(new Nodemailer());
};
