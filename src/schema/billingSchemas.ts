import { z } from 'zod';

// Common Schemas
const billingItemSchema = z.object({
  id: z.string(),
  persons: z.preprocess((val) => Number(val), z.number().min(1, 'Persons must be at least 1')),
  unitPrice: z.preprocess((val) => Number(val), z.number().min(0, 'Unit Price must be non-negative')),
});

// Corporate Schemas
export const corporateItemSchema = billingItemSchema.extend({
  date: z.string().min(1, 'Service Date is required'),
  packageType: z.string().min(1, 'Package Type is required'),
});

export const corporateBillSchema = z.object({
  id: z.string(),
  type: z.literal('Corporate'),
  corporateName: z.string().min(1, 'Corporate Name is required'),
  contactPerson: z.string().min(1, 'Contact Person is required'),
  contactNo: z.string().min(1, 'Contact Number is required'),
  date: z.string().min(1, 'Date is required'),
  items: z.array(corporateItemSchema),
  totalAmount: z.number(),
  amountInWords: z.string(),
});

// Event Schemas
export const eventItemSchema = billingItemSchema.extend({
  packageName: z.string().min(1, 'Package Name is required'),
  packageType: z.string().min(1, 'Package Type is required'),
  description: z.string().optional(),
});

export const eventBillSchema = z.object({
  id: z.string(),
  type: z.literal('Event'),
  eventName: z.string().min(1, 'Event Name is required'),
  contactPerson: z.string().min(1, 'Contact Person is required'),
  contactNo: z.string().min(1, 'Contact Number is required'),
  date: z.string().min(1, 'Date is required'),
  items: z.array(eventItemSchema),
  totalAmount: z.number(),
  amountInWords: z.string(),
});
