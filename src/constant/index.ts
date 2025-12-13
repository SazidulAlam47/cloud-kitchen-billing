export const BILL_TYPES = {
    CORPORATE: 'Corporate',
    EVENT: 'Event',
} as const;

export const DEFAULT_CORPORATE_ITEM = {
    packageType: 'Standard',
    persons: 0,
    unitPrice: 0,
};

export const DEFAULT_EVENT_ITEM = {
    packageName: '',
    packageType: '',
    description: '',
    persons: 0,
    unitPrice: 0,
};

export const DEFAULT_CORPORATE_BILL_VALUES = {
    type: BILL_TYPES.CORPORATE,
    corporateName: '',
    contactPerson: '',
    contactNo: '',
    items: [],
    totalAmount: 0,
    amountInWords: 'Zero Only',
};

export const DEFAULT_EVENT_BILL_VALUES = {
    type: BILL_TYPES.EVENT,
    eventName: '',
    contactPerson: '',
    contactNo: '',
    items: [],
    totalAmount: 0,
    amountInWords: 'Zero Only',
};
