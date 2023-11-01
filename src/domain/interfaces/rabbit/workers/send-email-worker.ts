export interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}
export interface SendEmailWorkerInterface {
  consumerQueue: (queue: string) => Promise<void>;
  sendEmail: (message: MailOptions) => Promise<void>;
}
