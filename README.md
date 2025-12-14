# Cloud Kitchen Billing Dashboard

A modern, responsive billing management system for a Cloud Kitchen, built with React, TypeScript, and Tailwind CSS. This application allows administrators to manage invoices for both Corporate clients (recurring meals) and Event clients (one-off occasions).

## Features

-   **Dashboard Overview**: Clean interface to view and manage all bills.
-   **Dual Billing System**:
    -   **Corporate Billing**: Handle month-long subscriptions with date-wise consumption tracking.
    -   **Event Billing**: Create invoices for custom events with flexible package options.
-   **Smart Calculations**:
    -   Automatic line-item totals.
    -   Real-time Grand Total updates.
    -   **Amount in Words**: Dynamically converts numeric totals to words (e.g., "One Thousand Taka Only").
-   **Data Persistence**: All data is stored locally in your browser, ensuring you don't lose work on refresh.
-   **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.
-   **Form Validation**: Robust validation using Zod to ensure data integrity.

## Tech Stack

-   **Frontend Framework**: [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Routing**: [React Router DOM](https://reactrouter.com/)
-   **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
-   **UI Components**: Custom components with [Lucide React](https://lucide.dev/) icons.
-   **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/SazidulAlam47/cloud-kitchen-billing
    cd cloud-kitchen-billing
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## Project Structure

```
src/
├── components/     # Reusable UI components (Layout, Billing, Form, UI)
├── pages/          # Page components (Dashboard, Create/Edit Forms)
├── redux/          # Redux slices and store configuration
├── routes/         # Router configuration
├── schema/         # Zod validation schemas
├── utils/          # Helper functions (Currency formatter, Number to Words)
└── main.tsx         # Root component
```

## Usage

### Corporate Billing
1.  Navigate to "Create Bill" -> "Corporate".
2.  Enter Company details.
3.  Add daily consumption logs (Date, Persons, Unit Price).
4.  Save the bill.

### Event Billing
1.  Navigate to "Create Bill" -> "Event".
2.  Enter Event details.
3.  Add packages (Name, Description, Pax, Price).
4.  Save the bill.

