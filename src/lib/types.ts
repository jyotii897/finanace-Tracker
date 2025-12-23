export type Currency = 'USD' | 'INR';

export interface Contribution {
    id: string;
    date: string; // ISO date string
    amount: number;
}

export interface Goal {
    id: string;
    name: string;
    targetAmount: number;
    currency: Currency;
    contributions: Contribution[];
    createdAt: string;
}

export interface ExchangeRateData {
    rate: number; // 1 USD = x INR
    lastUpdated: string; // ISO date string
}
