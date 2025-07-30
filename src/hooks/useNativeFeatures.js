import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { useAppStore } from '../store/appStore';

export const useNativeFeatures = () => {
    const theme = useAppStore((state) => state.theme);
    const isThemeInitialized = useAppStore((state) => state.isThemeInitialized);

    useEffect(() => {
        if (!isThemeInitialized) return;

        const setStatusBarStyle = async () => {
            // Проверяем, что мы на нативной платформе
            if (Capacitor.isNativePlatform()) {
                await StatusBar.setStyle({
                    style: theme === 'dark' ? Style.Dark : Style.Light,
                });
                const color = theme === 'dark' ? '#0f172a' : '#f1f5f9';
                await StatusBar.setBackgroundColor({ color });
            }
        };

        setStatusBarStyle();
    }, [theme, isThemeInitialized]);
};

export const hapticImpact = (style = ImpactStyle.Light) => {
    // Проверяем, что мы на нативной платформе
    if (Capacitor.isNativePlatform()) {
        Haptics.impact({ style });
    }
};

export const hapticNotification = () => {
    // Проверяем, что мы на нативной платформе
    if (Capacitor.isNativePlatform()) {
        Haptics.notification();
    }
};