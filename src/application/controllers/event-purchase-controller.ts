import { EventPurchase } from "@/domain/interfaces";
import { Controller, Responsebody } from "../interfaces";

export class EventPurchaseController implements Controller {

    public async handleRequest({ data }: EventPurchase | any): Promise<Responsebody | any> {
        console.info('[Event-purchase-controller]:', data);
        try {
            return data;
        } catch (error: any) {
            console.error('[Event-purchase-controller]:', error);
        }
      
    }
}
