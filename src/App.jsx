import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppStore } from './store/appStore';
import { useNativeFeatures } from './hooks/useNativeFeatures';
import { Toaster } from 'react-hot-toast';
import AppStyles from './styles/AppStyles';
import Header from './components/layout/Header';
import OllPage from './pages/OllPage';
import PllPage from './pages/PllPage';
import F2lPage from './pages/F2lPage';
import CrossPage from './pages/CrossPage';

function AppContent() {
    useNativeFeatures();

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
    const theme = useAppStore((state) => state.theme);
    const initializeTheme = useAppStore((state) => state.initializeTheme);
    const initializeLearnedOLLs = useAppStore((state) => state.initializeLearnedOLLs);
    const initializeLearnedPLLs = useAppStore((state) => state.initializeLearnedPLLs);
    const initializeLearnedF2Ls = useAppStore((state) => state.initializeLearnedF2Ls); // Добавляем инициализацию F2L

    useEffect(() => {
        initializeTheme();
        initializeLearnedOLLs();
        initializeLearnedPLLs();
        initializeLearnedF2Ls(); // Вызываем ее
    }, [initializeTheme, initializeLearnedOLLs, initializeLearnedPLLs, initializeLearnedF2Ls]);

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    return (
        <BrowserRouter>
            <AppStyles />
            <Toaster position="bottom-center" toastOptions={{
                style: {
                    background: theme === 'dark' ? '#1e293b' : '#ffffff',
                    color: theme === 'dark' ? '#e2e8f0' : '#1e293b',
                },
            }} />
            <AppContent />
        </BrowserRouter>
    );
}
