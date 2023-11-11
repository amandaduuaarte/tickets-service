import { ResendEmailInterface, ResendInterface } from "@/domain/interfaces/resend/resend-interfaces";
import { Resend } from "resend";

export class ResendConfig implements ResendInterface {
  constructor() {}

  async config(emailData: ResendEmailInterface.ResendParams) {
    const env = process.env;
    const resend = new Resend(env.RESEND_SECRET);
    await resend.emails.send(emailData);
  }
}
