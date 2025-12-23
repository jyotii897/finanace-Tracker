import { SavingsProvider } from '@/lib/SavingsContext';
import { MainView } from '@/components/MainView';

export default function Home() {
    return (
        <SavingsProvider>
            <MainView />
        </SavingsProvider>
    );
}
