import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
// OllProvider больше не нужен здесь
import AppStyles from './styles/AppStyles';
import Header from './components/layout/Header';

import OllPage from './pages/OllPage';
import PllPage from './pages/PllPage';
import F2lPage from './pages/F2lPage';
import CrossPage from './pages/CrossPage';

function AppContent() {
    useEffect(() => {
        const CapacitorApp = window.Capacitor?.Plugins?.App;
        if (!CapacitorApp) return;
        const listener = CapacitorApp.addListener('backButton', () => {
            CapacitorApp.exitApp();
        });
        return () => listener.remove();
    }, []);

    return (
        <div className="app-container">
            <Header />
            <Routes>
                <Route path="/" element={<OllPage />} />
                <Route path="/pll" element={<PllPage />} />
                <Route path="/f2l" element={<F2lPage />} />
                <Route path="/cross" element={<CrossPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            {/* OllProvider убран отсюда */}
            <BrowserRouter>
                <AppStyles />
                <AppContent />
            </BrowserRouter>
        </ThemeProvider>
    );
}