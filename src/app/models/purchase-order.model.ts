export interface PurchaseOrder {
  IdPurchaseOrder: number;
  Amount: number;
  PurchasedDate: string;
  IdFamily: number;
  ModifiedAt: string;
  CreatedAt: string;
  IsNotificated: boolean;
  PaymentType: string;
  ModifiedBy: string;
  CreatedBy: string;
  Currency: string;
  Invoice: string;
  LastFourCard: string;
  Seller: string;
  Family: any;
}
