import { OrderProduct } from "./order-product";

export interface Order {
  IdOrder:       number;
  IdUser:        number;
  OrderNumber:   number;
  DateTime:      string;
  ProviderName:  string;
  DateCreated:   string;
  Observation:   string;
  TotalValue:    number;
  Status:        number;
  Products:      OrderProduct[];
}

export type CreateOrder = Omit<Order, 'IdOrder' | 'Products' | 'Status'>

export type UpdateOrder = Omit<Order, 'Products' | 'Status'>