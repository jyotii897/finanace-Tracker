'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Goal } from '../lib/types';
import { useSavings } from '../lib/SavingsContext';
import { formatCurrency, cn } from '../lib/utils';
import { AddContributionModal } from './AddContributionModal';

interface GoalCardProps {
    goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
    const { exchangeRate } = useSavings();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate generic stats
    const savedAmount = goal.contributions.reduce((sum, c) => sum + c.amount, 0);
    const progress = goal.targetAmount > 0 ? (savedAmount / goal.targetAmount) * 100 : 0;

    // Calculate Dual Currency Values
    const isUSD = goal.currency === 'USD';

    // Primary (Original)
    const targetPrimary = formatCurrency(goal.targetAmount, goal.currency);
    const savedPrimary = formatCurrency(savedAmount, goal.currency);

    // Secondary (Converted)
    let targetSecondary = '---';
    let savedSecondary = '---';

    if (exchangeRate) {
        if (isUSD) {
            // USD -> INR
            targetSecondary = formatCurrency(goal.targetAmount * exchangeRate, 'INR');
            savedSecondary = formatCurrency(savedAmount * exchangeRate, 'INR');
        } else {
            // INR -> USD
            targetSecondary = formatCurrency(goal.targetAmount / exchangeRate, 'USD');
            savedSecondary = formatCurrency(savedAmount / exchangeRate, 'USD');
        }
    }

    const remaining = goal.targetAmount - savedAmount;
    const remainingFormatted = formatCurrency(Math.max(0, remaining), goal.currency);

    return (
        <>
            <div className="glass-card rounded-2xl p-6 transition-all hover:shadow-2xl hover:-translate-y-1 relative group">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{goal.name}</h3>
                        <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                {targetPrimary}
                            </span>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                            {targetSecondary}
                        </div>
                    </div>
                    <div className={cn(
                        "bg-slate-100 dark:bg-slate-800 text-xs font-bold px-2 py-1 rounded-md",
                        progress >= 100 ? "text-green-600 bg-green-100" : "text-slate-500"
                    )}>
                        {progress.toFixed(0)}%
                    </div>
                </div>

                {/* Progress Section */}
                <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-medium text-slate-500">
                        <span>Progress</span>
                        <span>{savedPrimary} saved</span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className={cn(
                                "h-full rounded-full transition-all duration-1000",
                                progress >= 100 ? "bg-green-500" : "bg-slate-900 dark:bg-white"
                            )}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                        <span>{goal.contributions.length} contributions</span>
                        <span>{remainingFormatted} remaining</span>
                    </div>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300 group-hover:border-indigo-200 dark:group-hover:border-indigo-900"
                >
                    <Plus size={16} />
                    Add Contribution
                </button>
            </div>

            <AddContributionModal
                goal={goal}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
