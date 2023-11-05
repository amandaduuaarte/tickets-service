import { Connection } from "@/infra/knex/config";

export const KnexConnectionFactory = () => {
  return new Connection();
};
