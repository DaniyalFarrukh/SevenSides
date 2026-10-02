# Seven Sides DEMO
Home of Red Tenders

## Quick Start
1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

## Pitch Walkthrough Script (5 mins)

**1. Customer Journey (3 mins)**
- Start at **http://localhost:3000**.
- **Action**: Explain that the customer lands on a premium page perfectly matched to Seven Sides' vibrant vibe. The Entry Modal forces them to pick a branch for accurate pricing/delivery.
- **Action**: Scroll the categories and click on "Red Tenders". Add to cart.
- **Action**: Open Cart Drawer (bottom right or top right). Show how the delivery fee + tax is dynamically calculated and minimum order is validated.
- **Action**: Click "Checkout", quickly run through the stepped checkout (Auth -> Address -> Payment). Point out how clean and conversion-optimized it is.
- **Action**: Hit "Place Order", landing on `/tracking`. Point out the live tracker and rider ETA, minimizing call volumes to the branches.

**2. Admin Console (1 min)**
- **Action**: Use the floating `DEMO MODE` switcher (bottom left cog) to jump to "Admin Console" (`/admin`).
- **Action**: Show the real-time Dashboard (Revenue, Orders, Delivery Time charts). 
- **Action**: Show the Live Orders Kanban. "This is what your branch manager sees."

**3. Rider & Delivery (1 min)**
- **Action**: Jump to "Rider App" (`/rider`).
- **Action**: Show the simplified, high-contrast mobile view for riders to accept routes and get drop-off details without heavy UI.

**4. Close (30 secs)**
- **Action**: Jump to "Features Printout" (`/features`).
- Hit **Cmd/Ctrl + P** to save/print as a PDF for the client, highlighting the "Zero Commission" benefit.

## Demo Credentials
Since this is a client pitch demo, it uses local state (Zustand). All auth steps use mock data (any phone number works). Orders are simulated client-side. Reset the demo using the "Reset Demo Data" button in the floating Demo Switcher.
