import * as amqp from "amqplib";

import { MailOptions, SendEmailWorkerInterface } from "@/domain/interfaces/rabbit/workers/send-email-worker";
import { Nodemailer } from "@/infra/nodemailer/config";
import { BadRequestException } from "@/application/errors/errorExpection";
import { BAD_REQUEST } from "@/application/constants";

export class SendEmailWorker implements SendEmailWorkerInterface {
  constructor(private readonly nodemail: Nodemailer) {
    this.nodemail = nodemail;
  }

  async consumerQueue(queue: string): Promise<void> {
    const uri = "amqp://guest:guest@localhost:5672";
    const env = process.env;
    try {
      const connection = await amqp.connect(uri);
      const channel = await connection.createChannel();
      channel.assertQueue(queue);

      channel.consume(queue, (message) => {
        if (message !== null) {
          const content = JSON.parse(message.content.toString());
          console.info("[SendEmailWorker]: Message received at worker:", content);

          const sendEmailData = {
            from: env.EMAIL_USER || "ticketsnodemailerservice@zohomail.com",
            to: content.email,
            subject: "Tickets-Service",
            text: "Aquiiii",
          };

          this.sendEmail(sendEmailData);
          channel.ack(message);
        }
      });
    } catch (err: any) {
      console.error(`[SendEmailWorker]: message not found`, err);
      throw new Error("Não foi possível realizar o envio de email.");
    }
  }

  async sendEmail(data: MailOptions): Promise<void> {
    try {
      console.info(`[SendEmailWorker]: Try sending email to ${data.to}`);
      if (!data) {
        console.error(`[SendEmailWorker]: Params are not send.`);
        throw new BadRequestException("Os parametros devem ser enviados.", BAD_REQUEST);
      }

      this.nodemail.config().sendMail(data, (error, info) => {
        if (error) {
          console.error(`[SendEmailWorker]: Error sending email`, error);
        } else {
          console.info(`[SendEmailWorker]: Successful email sending: ${info}`);
        }
      });
    } catch (err: any) {
      throw new BadRequestException("Ocorreu um erro no envio do e-mail.", BAD_REQUEST);
    }
  }
}
