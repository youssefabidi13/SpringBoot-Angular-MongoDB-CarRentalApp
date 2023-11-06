import { Car } from "./car";
import { Client } from "./client";

export interface Order {
    id: any;
    client: Client;
    car: Car;
    state: Statu;
    startDate: string; // You can use the 'string' type or a custom type for dates
    endDate: string; // You can use the 'string' type or a custom type for dates
    totalCost: number;
  }

  export enum Statu {
    Accepte = 'Accepte',
    Refuse = 'Refuse',
    InHold = 'InHold'
  }