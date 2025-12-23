# Syfe Savings Planner 🍯

A lightweight, premium Savings Planner application helping you track financial goals across multiple currencies (INR/USD). Built with Next.js 15, Tailwind CSS, and specific attention to design details.

[**🚀 View Live Demo**](https://finanace-tracker-3a57z45ep-rayjyoti66-7368s-projects.vercel.app)

## Features

- **Goal Creation**: Create multiple savings goals with specific targets and currencies.
- **Dual Currency Tracking**: View your goals in both INR and USD with real-time exchange rates.
- **Progress Visualization**: Interactive progress bars and dashboard summaries.
- **Persistent Storage**: Data is saved locally in your browser, so you never lose track.
- **Live Exchange Rates**: Uses real-time data to convert values accurately.
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop.
- **Glassmorphism UI**: Modern, sleek interface with glass-effect cards and detailed micro-interactions.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Language**: TypeScript
- **Icons**: Lucide React
- **State Management**: React Context + LocalStorage

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jyotii897/finanace-Tracker.git
   cd SyfeSavingsPlanner
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Design Decisions

- **Client-Side Only**: As requested, the app uses `localStorage` for persistence, making it fully functional without a backend.
- **Currency Conversion**: We use a free exchange rate API (`open.er-api.com`) to fetch real-time rates. If the API fails, it falls back to a cached rate.
- **Styling**: We avoided component libraries (MUI, Chakra) in favor of raw Tailwind CSS to demonstrate control over design and bundle size. We used CSS variables for theming support (Dark Mode ready).

## Project Structure

- `src/components`: UI components (Dashboard, GoalCard, Modals)
- `src/lib`: Logic, Types, and Context (SavingsContext, useExchangeRate)
- `src/app`: Pages and Global Styles

## Deployment

This app is ready to be deployed on Vercel.
1. Push to GitHub.
2. Import project in Vercel.
3. Deploy!

## License

MIT
