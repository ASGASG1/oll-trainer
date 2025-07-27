import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { OllProvider } from './context/OllContext';
import AppStyles from './styles/AppStyles';
import Header from './components/layout/Header';
import Controls from './components/layout/Controls';
import OllList from './components/oll/OllList';

function AppContent() {
    const [trainingCardId, setTrainingCardId] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        const CapacitorApp = window.Capacitor?.Plugins?.App;
        if (!CapacitorApp) return;

        const listener = CapacitorApp.addListener('backButton', () => {
            if (trainingCardId) {
                setTrainingCardId(null);
            } else {
                CapacitorApp.exitApp();
            }
        });

        return () => listener.remove();
    }, [trainingCardId]);

    return (
        <div className="app-container">
            <Header />
            <Controls 
                setTrainingCardId={setTrainingCardId}
                setShowAnswer={setShowAnswer}
            />
            <main style={{ marginTop: '2rem' }}>
                <OllList 
                    trainingCardId={trainingCardId}
                    showAnswer={showAnswer}
                    setShowAnswer={setShowAnswer}
                />
            </main>
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <OllProvider>
                <AppStyles />
                <AppContent />
            </OllProvider>
        </ThemeProvider>
    );
}
