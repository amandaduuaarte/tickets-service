import * as amqp from "amqplib";

import { MailOptions, SendEmailWorkerInterface } from "@/domain/interfaces/rabbit/workers/send-email-worker";

import { BadRequestException } from "@/application/errors/errorExpection";
import { BAD_REQUEST } from "@/application/constants";
import { ResendConfig } from "@/infra/resend/config";

export class SendEmailWorker implements SendEmailWorkerInterface {
  constructor(private readonly resend: ResendConfig) {
    this.resend = resend;
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
            from: "onboarding@resend.dev",
            to: content.email,
            subject: "Tickets-Service",
            html: `<h2> Compra realizada!</h2>
              <p>Sua compra foi processada com sucesso, segue em anexo seus tickets.</p>
            `,
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

      this.resend
        .config(data)
        .then(() => {
          console.info(`[SendEmailWorker]: Successful email sending`);
        })
        .catch((error: any) => {
          console.error(`[SendEmailWorker]: Error sending email`, error);
        });
    } catch (err: any) {
      throw new BadRequestException("Ocorreu um erro no envio do e-mail.", BAD_REQUEST);
    }
  }
}
