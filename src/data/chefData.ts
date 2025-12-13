export const PACKAGE_TYPES = [
    {
      id: "economy",
      name: "Economy",
      defaultUnitPrice: 150
    },
    {
      id: "standard",
      name: "Standard",
      defaultUnitPrice: 250
    },
    {
      id: "premium",
      name: "Premium",
      defaultUnitPrice: 400
    }
] as const;

export const INITIAL_CORPORATE_BILLS = [
    {
      id: "CORP-0001",
      corporateName: "X Ltd",
      contactPerson: "XYZ",
      contactNo: "0178888",
      date: "2025-01-04",
      type: "Corporate",
      items: [
        {
          id: "1",
          date: "2025-01-01",
          packageType: "Standard",
          persons: 50,
          unitPrice: 200,
        },
        {
          id: "2",
          date: "2025-01-03",
          packageType: "Economy",
          persons: 10,
          unitPrice: 100,
        }
      ],
      totalAmount: 11000,
      amountInWords: "BDT Eleven Thousand Only"
    }
];

export const INITIAL_EVENT_BILLS = [
    {
      id: "EVT-0001",
      eventName: "X Event",
      contactPerson: "XYZ",
      contactNo: "0178888",
      date: "2025-01-04",
      type: "Event",
      items: [
        {
          id: "1",
          packageName: "Package-1",
          packageType: "Economy",
          description: "Rice, Chicken, Salad",
          persons: 30,
          unitPrice: 200,
        },
        {
          id: "2",
          packageName: "Package-2",
          packageType: "Premium",
          description: "Beef, Prawn, Dessert",
          persons: 10,
          unitPrice: 400,
        }
      ],
      totalAmount: 10000,
      amountInWords: "BDT Ten Thousand Only"
    }
];

export const COMPANY_INFO = {
  currency: "BDT",
  companyName: "Cloud Kitchen Limited",
  address: "Dhaka, Bangladesh",
  phone: "+88017xxxxxxx"
};
