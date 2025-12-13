import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BillingState, CorporateBill, EventBill } from '../../../types';
import { INITIAL_CORPORATE_BILLS, INITIAL_EVENT_BILLS } from '../../../data/chefData';

// Safe check for localStorage
const loadState = (): BillingState => {
  try {
    const serializedState = localStorage.getItem('billingState');
    if (serializedState === null) {
      return {
        corporateBills: INITIAL_CORPORATE_BILLS as unknown as CorporateBill[],
        eventBills: INITIAL_EVENT_BILLS as unknown as EventBill[],
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      corporateBills: INITIAL_CORPORATE_BILLS as unknown as CorporateBill[],
      eventBills: INITIAL_EVENT_BILLS as unknown as EventBill[],
    };
  }
};

const initialState: BillingState = loadState();

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    addCorporateBill: (state, action: PayloadAction<CorporateBill>) => {
      state.corporateBills.push(action.payload);
      localStorage.setItem('corporateBills', JSON.stringify(state.corporateBills));
    },
    updateCorporateBill: (state, action: PayloadAction<CorporateBill>) => {
      const index = state.corporateBills.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.corporateBills[index] = action.payload;
        localStorage.setItem('corporateBills', JSON.stringify(state.corporateBills));
      }
    },
    deleteCorporateBill: (state, action: PayloadAction<string>) => {
      state.corporateBills = state.corporateBills.filter((b) => b.id !== action.payload);
      localStorage.setItem('corporateBills', JSON.stringify(state.corporateBills));
    },
    addEventBill: (state, action: PayloadAction<EventBill>) => {
      state.eventBills.push(action.payload);
      localStorage.setItem('eventBills', JSON.stringify(state.eventBills));
    },
    updateEventBill: (state, action: PayloadAction<EventBill>) => {
      const index = state.eventBills.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.eventBills[index] = action.payload;
        localStorage.setItem('eventBills', JSON.stringify(state.eventBills));
      }
    },
    deleteEventBill: (state, action: PayloadAction<string>) => {
      state.eventBills = state.eventBills.filter((b) => b.id !== action.payload);
      localStorage.setItem('eventBills', JSON.stringify(state.eventBills));
    },
  },
});

export const {
  addCorporateBill,
  updateCorporateBill,
  deleteCorporateBill,
  addEventBill,
  updateEventBill,
  deleteEventBill,
} = billingSlice.actions;

export default billingSlice.reducer;
