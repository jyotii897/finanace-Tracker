import { useState, useEffect, useCallback } from 'react';
import { ExchangeRateData } from '../types';

const RATE_API_URL = 'https://open.er-api.com/v6/latest/USD';

export function useExchangeRate() {
    const [data, setData] = useState<ExchangeRateData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRate = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(RATE_API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch exchange rate');
            }
            const json = await response.json();
            const inrRate = json.rates.INR;

            const rateData: ExchangeRateData = {
                rate: inrRate,
                lastUpdated: new Date().toISOString(),
            };

            setData(rateData);
            localStorage.setItem('syfe_exchange_rate', JSON.stringify(rateData));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
            // Try to load from cache if fetch fails
            const cached = localStorage.getItem('syfe_exchange_rate');
            if (cached) {
                setData(JSON.parse(cached));
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Initial load
        const cached = localStorage.getItem('syfe_exchange_rate');
        // If cache is older than 1 hour, refetch automatically? Or just load cache then fetch.
        // For now, let's load cache, then fetch fresh.
        if (cached) {
            setData(JSON.parse(cached));
        }
        fetchRate();
    }, [fetchRate]);

    return { data, loading, error, refresh: fetchRate };
}
