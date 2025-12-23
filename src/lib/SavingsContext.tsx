'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Goal, Contribution, Currency } from './types';
import { useExchangeRate } from './useExchangeRate';

interface SavingsContextType {
    goals: Goal[];
    addGoal: (name: string, targetAmount: number, currency: Currency) => void;
    addContribution: (goalId: string, amount: number, date: string) => void;
    exchangeRate: number | null;
    lastUpdated: string | null;
    isRateLoading: boolean;
    rateError: string | null;
    refreshRate: () => void;
}

const SavingsContext = createContext<SavingsContextType | undefined>(undefined);

export function SavingsProvider({ children }: { children: ReactNode }) {
    const [goals, setGoals] = useState<Goal[]>([]);
    const { data: rateData, loading: isRateLoading, error: rateError, refresh: refreshRate } = useExchangeRate();

    // Load goals from local storage on mount
    useEffect(() => {
        const savedGoals = localStorage.getItem('syfe_goals');
        if (savedGoals) {
            try {
                setGoals(JSON.parse(savedGoals));
            } catch (e) {
                console.error('Failed to parse goals', e);
            }
        }
    }, []);

    // Save goals to local storage whenever they change
    useEffect(() => {
        if (goals.length > 0) {
            localStorage.setItem('syfe_goals', JSON.stringify(goals));
        }
    }, [goals]);

    const addGoal = (name: string, targetAmount: number, currency: Currency) => {
        const newGoal: Goal = {
            id: crypto.randomUUID(),
            name,
            targetAmount,
            currency,
            contributions: [],
            createdAt: new Date().toISOString(),
        };
        setGoals((prev) => [...prev, newGoal]);
    };

    const addContribution = (goalId: string, amount: number, date: string) => {
        setGoals((prev) =>
            prev.map((goal) => {
                if (goal.id === goalId) {
                    const newContribution: Contribution = {
                        id: crypto.randomUUID(),
                        amount,
                        date,
                    };
                    return {
                        ...goal,
                        contributions: [...goal.contributions, newContribution],
                    };
                }
                return goal;
            })
        );
    };

    return (
        <SavingsContext.Provider
            value={{
                goals,
                addGoal,
                addContribution,
                exchangeRate: rateData?.rate ?? null,
                lastUpdated: rateData?.lastUpdated ?? null,
                isRateLoading,
                rateError,
                refreshRate,
            }}
        >
            {children}
        </SavingsContext.Provider>
    );
}

export function useSavings() {
    const context = useContext(SavingsContext);
    if (context === undefined) {
        throw new Error('useSavings must be used within a SavingsProvider');
    }
    return context;
}
