export interface OrderProduct {
  IdOrdersProducts:  number;
  IdOrder:           number;
  ValueUnit:         number;
  Unit:              string;
  Description:       string;
  SKU:               string;
  Quantity:          number;
  QtyBox:            number;
  Weight:            number;
  Volumen:           number;
  Mark:              string;
  Status:            number;
}

export type CreateOrderProduct = Omit<OrderProduct, 'IdOrdersProducts' | 'Status'>

export type UpdateOrderProduct = Omit<OrderProduct, 'Status'>