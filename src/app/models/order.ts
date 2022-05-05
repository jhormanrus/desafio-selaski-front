export interface Order {
  IdOrder?:      number;
  IdUser:        number;
  OrderNumber:   number;
  DateTime:      Date;
  ProviderName:  string;
  DateCreated:   Date;
  Observation:   string;
  TotalValue:    number;
  Status:        number;
}