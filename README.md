# BarOn React MVP

A navigable bilingual marketplace prototype for bartenders and mobile bars.

## Run locally

1. Install Node.js 18+
2. Open this folder in Terminal
3. Run:

```bash
npm install
npm run dev
```

Then open the local Vite URL.

## Included demo flows

Customer:
Home → Find a Pro → Provider Profile → Quotes → Checkout → Booking Confirmation

Also:
Post an Event, Messages, Bookings

Provider:
BarOn Pro → Lead Detail → Send Quote

## Tech

React + Vite + CSS + lucide-react

This is a front-end prototype. Payments, authentication, maps and database are mocked and can be added later with Supabase/Stripe.


## BarOn V2 update

- Fixed the non-functional **View Details** button in Bookings.
- Added a complete **Booking Details** screen.
- Booking detail now shows confirmation number, event details, provider, services, pricing and demo deposit.
- Added functional **Message Provider** navigation.
- Added a safe placeholder for the future cancellation flow.
