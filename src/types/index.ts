export interface BaseBill {
  id: string;
  contactPerson: string;
  contactNo: string;
  date: string;
  totalAmount: number;
  amountInWords: string;
}

export interface CorporateItem {
  id: string;
  date: string;
  packageType: string;
  persons: number;
  unitPrice: number;
}

export type TRoute = {
  path: string;
  element: React.ReactNode;
};

export type TUserIndexPath = {
  name?: string;
  path?: string;
  element?: React.ReactNode;
  children?: TUserIndexPath[];
};

export interface CorporateBill extends BaseBill {
  type: 'Corporate';
  corporateName: string;
  items: CorporateItem[];
}

export interface EventItem {
  id: string;
  packageName: string;
  packageType: string;
  description: string;
  persons: number;
  unitPrice: number;
}

export interface EventBill extends BaseBill {
  type: 'Event';
  eventName: string;
  items: EventItem[];
}

export type Bill = CorporateBill | EventBill;

export interface BillingState {
  corporateBills: CorporateBill[];
  eventBills: EventBill[];
}
