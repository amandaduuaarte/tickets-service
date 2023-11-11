export interface ResendInterface {
  config(email: ResendEmailInterface.ResendParams): Promise<void>;
}

export namespace ResendEmailInterface {
  export type ResendParams = {
    from: string;
    to: string;
    subject: string;
    html: string;
  };
}
