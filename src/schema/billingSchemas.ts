import { z } from 'zod';
import { BILL_TYPES } from '../constant';

export const corporateItemSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  packageType: z.string().min(1, 'Package type is required'),
  persons: z.coerce.number().min(1, 'At least 1 person is required'),
  unitPrice: z.coerce.number().min(1, 'Unit price must be greater than 0'),
});

export const corporateBillSchema = z.object({
  type: z.literal(BILL_TYPES.CORPORATE),
  corporateName: z.string().min(1, 'Corporate Name is required'),
  contactPerson: z.string().min(1, 'Contact Person is required'),
  contactNo: z.string().min(11, 'Contact No must be at least 11 digits'),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  items: z.array(corporateItemSchema).min(1, "At least one item is required"),
  totalAmount: z.coerce.number(),
  amountInWords: z.string(),
});

export const eventItemSchema = z.object({
  id: z.string().optional(),
  packageName: z.string().min(1, 'Package Name is required'),
  packageType: z.string().optional(),
  description: z.string().optional(),
  persons: z.coerce.number().min(1, 'At least 1 person is required'),
  unitPrice: z.coerce.number().min(1, 'Unit price must be greater than 0'),
});

export const eventBillSchema = z.object({
  type: z.literal(BILL_TYPES.EVENT),
  eventName: z.string().min(1, 'Event Name is required'),
  contactPerson: z.string().min(1, 'Contact Person is required'),
  contactNo: z.string().min(1, 'Contact Number is required'),
  date: z.string().min(1, 'Date is required'),
  items: z.array(eventItemSchema),
  totalAmount: z.coerce.number(),
  amountInWords: z.string(),
});
