import { EventPurchase } from "@/domain/interfaces";
import { Controller, Response } from "../interfaces";

export class EventPurchaseController implements Controller {

    public async handleRequest({ data }: EventPurchase | any): Promise<Response | any> {
        console.info('[Event-purchase-controller]:', data);
        try {
            return data;
        } catch (error: any) {
            console.error('[Event-purchase-controller]:', error);
        }
      
    }
}
