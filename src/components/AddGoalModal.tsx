'use client';

import { useState } from 'react';
import { X, Target, Type, Coins } from 'lucide-react';
import { useSavings } from '../lib/SavingsContext';
import { Currency } from '../lib/types';
import { cn } from '../lib/utils';

interface AddGoalModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddGoalModal({ isOpen, onClose }: AddGoalModalProps) {
    const { addGoal } = useSavings();
    const [name, setName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [currency, setCurrency] = useState<Currency>('INR');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const val = parseFloat(targetAmount);
        if (!name || isNaN(val) || val <= 0) return;

        addGoal(name, val, currency);
        setName('');
        setTargetAmount('');
        setCurrency('INR'); // Reset to default
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Create New Goal
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Name Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Goal Name
                        </label>
                        <div className="relative">
                            <Type className="absolute left-3 top-2.5 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 transition-all"
                                placeholder="e.g. Trip to Japan"
                                required
                            />
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Target Amount
                        </label>
                        <div className="relative">
                            <Target className="absolute left-3 top-2.5 text-slate-400" size={18} />
                            <input
                                type="number"
                                value={targetAmount}
                                onChange={(e) => setTargetAmount(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 dark:bg-slate-800 transition-all"
                                placeholder="0.00"
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    {/* Currency Selection */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Currency
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {(['INR', 'USD'] as const).map((curr) => (
                                <button
                                    key={curr}
                                    type="button"
                                    onClick={() => setCurrency(curr)}
                                    className={cn(
                                        "flex items-center justify-center gap-2 py-2.5 rounded-xl border font-medium transition-all",
                                        currency === curr
                                            ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-500"
                                            : "border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                                    )}
                                >
                                    <Coins size={16} />
                                    {curr}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl text-slate-600 font-medium hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!name || !targetAmount}
                            className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all active:scale-95 disabled:opacity-50"
                        >
                            Create Goal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
