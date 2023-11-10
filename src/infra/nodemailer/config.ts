import { NodemailerInterface } from "@/application/interfaces/nodemailer";
import nodemailer from "nodemailer";

export class Nodemailer implements NodemailerInterface {
  constructor() {}

  config() {
    const env = process.env;
    const transporter = nodemailer.createTransport({
      host: env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_USER_PASSWORD,
      },
    });
    return transporter;
  }
}
