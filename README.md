
# Smart Stock

**Smart Stock: AI-powered POS and inventory reconciliation that saves retailers time and money.**

A web app built to fix gaps in point-of-sale (POS) systems and streamline inventory management for small businesses. Leveraging AI, it matches transactions, reconciles stock levels, and flags discrepancies—all in real-time.

---

## Features
- **Transaction Matching**: Syncs POS data to identify sales inconsistencies.
- **Inventory Reconciliation**: Automatically adjusts stock based on transactions.
- **AI Alerts**: Highlights gaps (e.g., low stock, mismatches) for quick action.
- **Real-Time Updates**: Powered by Supabase Realtime for live data.

*Coming Soon*: Predictive demand analysis, SMS/email notifications.

---

## Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Supabase (PostgreSQL), Vercel Functions
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth
- **Hosting**: Vercel
- **AI Assistance**: Cursor

---

## Getting Started

### Prerequisites
- Node.js (16+)
- Supabase account (free tier)
- Vercel account (free tier)

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/[your-username]/smart-stock.git
   cd smart-stock
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Run locally:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

### Deployment
- Push to Vercel:
  ```bash
   vercel deploy
   ```

---

## Usage
1. Sign up/login via Supabase Auth.
2. Add mock POS data via the `/api/pos` endpoint (POST request with `sale_amount` and `items`).
3. View transactions and inventory on the dashboard.
4. Run `/api/reconcile` to check for discrepancies.

*Note*: Real POS integration (e.g., Square) in progress—currently uses mock data.

---

## Roadmap
- [x] MVP: Transaction matching and inventory dashboard
- [x] AI reconciliation logic
- [ ] Real POS API integration (e.g., Square, Shopify)
- [ ] Predictive stock demand using AI
- [ ] Real-time alerts (SMS/email)
- [ ] Public beta with small retailers

---

## Contributing
Built by a self-taught dev (me!)—feedback and contributions welcome! 
- Open an issue or PR on GitHub.
- Ping me on X: @[your-username] with ideas or bugs.

---

## Why Smart Stock?
- **For Retailers**: Saves time, cuts losses from inventory gaps.
- **For Me**: A passion project to master full-stack dev and build something startups love.

---

## License
MIT License—free to use, modify, and share.

---

### Notes
- Replace `[your-username]` with your actual GitHub/X handle.
- Update the roadmap as you complete milestones (e.g., check off “AI reconciliation” once done).
- This README doubles as a portfolio piece—share it on X to show progress and attract attention!

What’s next—tweaking this, or diving into the first commit? Let me know!
