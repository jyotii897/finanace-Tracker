'use client';

import { useSavings } from '../lib/SavingsContext';
import { formatCurrency } from '../lib/utils';
import { TrendingUp, Wallet, Target } from 'lucide-react';
import { ExchangeRateWidget } from './ExchangeRateWidget';

export function Dashboard() {
    const { goals, exchangeRate } = useSavings();

    if (!exchangeRate) {
        return (
            <div className="w-full h-48 rounded-3xl bg-slate-200 dark:bg-slate-800 animate-pulse flex items-center justify-center text-slate-400">
                Loading Financial Data...
            </div>
        );
    }

    // Calculations
    let totalTargetInr = 0;
    let totalSavedInr = 0;

    goals.forEach((goal) => {
        const saved = goal.contributions.reduce((sum, c) => sum + c.amount, 0);

        if (goal.currency === 'INR') {
            totalTargetInr += goal.targetAmount;
            totalSavedInr += saved;
        } else {
            totalTargetInr += goal.targetAmount * exchangeRate;
            totalSavedInr += saved * exchangeRate;
        }
    });

    const totalTargetUsd = totalTargetInr / exchangeRate;
    const totalSavedUsd = totalSavedInr / exchangeRate;

    const overallProgress = totalTargetInr > 0 ? (totalSavedInr / totalTargetInr) * 100 : 0;

    return (
        <div className="w-full relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white shadow-2xl p-6 sm:p-10 mb-12">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                            <TrendingUp className="text-white" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">Financial Overview</h2>
                    </div>
                    <div className="bg-black/20 backdrop-blur-md rounded-lg px-3 py-1.5 border border-white/10">
                        <ExchangeRateWidget />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Total Targets */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-indigo-100 text-sm font-medium">
                            <Target size={16} />
                            <span>Total Targets</span>
                        </div>
                        <div className="text-3xl font-bold">
                            {formatCurrency(totalTargetInr, 'INR')}
                        </div>
                        <div className="text-white/60 text-sm">
                            {formatCurrency(totalTargetUsd, 'USD')}
                        </div>
                    </div>

                    {/* Total Saved */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-indigo-100 text-sm font-medium">
                            <Wallet size={16} />
                            <span>Total Saved</span>
                        </div>
                        <div className="text-3xl font-bold">
                            {formatCurrency(totalSavedInr, 'INR')}
                        </div>
                        <div className="text-white/60 text-sm">
                            {formatCurrency(totalSavedUsd, 'USD')}
                        </div>
                    </div>

                    {/* Overall Progress */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-indigo-100 font-medium">
                            <span>Overall Progress</span>
                            <span>{overallProgress.toFixed(1)}%</span>
                        </div>
                        <div className="h-4 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                            <div
                                className="h-full bg-gradient-to-r from-green-300 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${overallProgress}%` }}
                            />
                        </div>
                        <div className="text-right text-xs text-white/50">
                            Total goals completion
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
