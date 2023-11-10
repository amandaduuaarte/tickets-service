import { NodemailerInterface } from "@/application/interfaces/nodemailer";
import { Nodemailer } from "@/infra/nodemailer/config";

export const ConfigFactory = (): NodemailerInterface => {
  return new Nodemailer();
};
