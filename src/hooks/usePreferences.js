import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

export const usePreferences = (key, defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    // Асинхронно загружаем значение при первом рендере
    useEffect(() => {
        const loadStoredValue = async () => {
            const { value: storedValue } = await Preferences.get({ key });
            if (storedValue !== null) {
                try {
                    setValue(JSON.parse(storedValue));
                } catch (e) {
                    console.error("Ошибка парсинга значения из Preferences", e);
                }
            }
        };
        loadStoredValue();
    }, [key]);

    // Сохраняем новое значение при его изменении
    useEffect(() => {
        const saveValue = async () => {
            await Preferences.set({
                key: key,
                value: JSON.stringify(value),
            });
        };
        saveValue();
    }, [key, value]);

    return [value, setValue];
};