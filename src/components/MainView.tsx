'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Dashboard } from './Dashboard';
import { GoalCard } from './GoalCard';
import { AddGoalModal } from './AddGoalModal';
import { useSavings } from '../lib/SavingsContext';

export function MainView() {
    const { goals } = useSavings();
    const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Section */}
                <header className="flex flex-col items-center text-center space-y-2 py-8">
                    <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4 transform rotate-3 hover:rotate-6 transition-transform">
                        <span className="text-2xl">🍯</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Syfe Savings Planner
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Track your financial goals and build your future
                    </p>
                </header>

                <Dashboard />

                {/* Goals Section */}
                <section className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            Your Goals
                            <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs px-2.5 py-0.5 rounded-full">
                                {goals.length}
                            </span>
                        </h2>
                        <button
                            onClick={() => setIsAddGoalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-medium hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10"
                        >
                            <Plus size={18} />
                            Add Goal
                        </button>
                    </div>

                    {goals.length === 0 ? (
                        <div className="text-center py-20 px-4 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Plus className="text-slate-400" size={32} />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No goals yet</h3>
                            <p className="text-slate-500 max-w-sm mx-auto mb-6">
                                Start your journey by adding your first financial goal. Whether it's a trip or an emergency fund, we've got you covered.
                            </p>
                            <button
                                onClick={() => setIsAddGoalOpen(true)}
                                className="text-indigo-600 hover:text-indigo-700 font-semibold"
                            >
                                Create your first goal &rarr;
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {goals.map((goal) => (
                                <GoalCard key={goal.id} goal={goal} />
                            ))}
                        </div>
                    )}
                </section>

                {/* Footer */}
                <footer className="pt-12 pb-8 text-center text-sm text-slate-400">
                    <p>© {new Date().getFullYear()} Syfe Savings Planner. Design assignment.</p>
                </footer>
            </div>

            <AddGoalModal
                isOpen={isAddGoalOpen}
                onClose={() => setIsAddGoalOpen(false)}
            />
        </main>
    );
}
