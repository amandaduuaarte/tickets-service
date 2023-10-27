/* eslint-disable no-unused-vars */
export interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}
export interface SendEmailWorkerInterface {
  consumerQueue: (queue: string) => Promise<void>;
  sendEmail: (message: MailOptions) => Promise<void>;
}
