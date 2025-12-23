'use client';

import { RefreshCw } from 'lucide-react';
import { useSavings } from '../lib/SavingsContext';
import { cn } from '../lib/utils';

export function ExchangeRateWidget() {
    const { exchangeRate, lastUpdated, isRateLoading, refreshRate } = useSavings();

    if (!exchangeRate) return null;

    return (
        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>
                Exchange Rate: 1 USD = ₹{exchangeRate.toFixed(2)}
            </span>
            {lastUpdated && (
                <span>
                    Last updated: {new Date(lastUpdated).toLocaleTimeString()}
                </span>
            )}
            <button
                onClick={refreshRate}
                disabled={isRateLoading}
                className={cn(
                    "p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors",
                    isRateLoading && "animate-spin"
                )}
                title="Refresh Rates"
            >
                <RefreshCw size={14} />
            </button>
        </div>
    );
}
