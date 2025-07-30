import { create } from 'zustand';
import { Preferences } from '@capacitor/preferences';
import { ollData } from '../data/ollData';
import { pllData } from '../data/pllData';
import { f2lData } from '../data/f2lData'; // Импортируем новые данные

// Вспомогательная функция для сохранения состояния в нативное хранилище
const persistState = async (key, value) => {
    await Preferences.set({ key, value: JSON.stringify(value) });
};

// Создаем наше центральное хранилище Zustand
export const useAppStore = create((set, get) => ({
    // --- Состояние темы ---
    theme: 'light',
    isThemeInitialized: false,
    initializeTheme: async () => {
        const { value } = await Preferences.get({ key: 'theme' });
        if (value) {
            set({ theme: JSON.parse(value), isThemeInitialized: true });
        } else {
            set({ isThemeInitialized: true });
        }
    },
    toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        persistState('theme', newTheme);
    },

    // --- Состояние для раздела OLL ---
    learnedOLLs: new Set(),
    searchTermOLL: '',
    activeFilterOLL: 'all',
    showAdvancedOLL: false,
    initializeLearnedOLLs: async () => {
        const { value } = await Preferences.get({ key: 'learnedOLLs' });
        if (value) {
            set({ learnedOLLs: new Set(JSON.parse(value)) });
        }
    },
    toggleLearnedOLL: (id) => {
        const newLearned = new Set(get().learnedOLLs);
        if (newLearned.has(id)) {
            newLearned.delete(id);
        } else {
            newLearned.add(id);
        }
        set({ learnedOLLs: newLearned });
        persistState('learnedOLLs', Array.from(newLearned));
    },
    resetProgressOLL: () => {
        set({ learnedOLLs: new Set() });
        persistState('learnedOLLs', []);
    },
    setSearchTermOLL: (term) => set({ searchTermOLL: term }),
    setActiveFilterOLL: (filter) => set({ activeFilterOLL: filter }),
    setShowAdvancedOLL: (show) => set({ showAdvancedOLL: show }),

    // --- Состояние для раздела PLL ---
    learnedPLLs: new Set(),
    searchTermPLL: '',
    activeFilterPLL: 'all',
    showAdvancedPLL: false,
    initializeLearnedPLLs: async () => {
        const { value } = await Preferences.get({ key: 'learnedPLLs' });
        if (value) {
            set({ learnedPLLs: new Set(JSON.parse(value)) });
        }
    },
    toggleLearnedPLL: (id) => {
        const newLearned = new Set(get().learnedPLLs);
        if (newLearned.has(id)) {
            newLearned.delete(id);
        } else {
            newLearned.add(id);
        }
        set({ learnedPLLs: newLearned });
        persistState('learnedPLLs', Array.from(newLearned));
    },
    resetProgressPLL: () => {
        set({ learnedPLLs: new Set() });
        persistState('learnedPLLs', []);
    },
    setSearchTermPLL: (term) => set({ searchTermPLL: term }),
    setActiveFilterPLL: (filter) => set({ activeFilterPLL: filter }),
    setShowAdvancedPLL: (show) => set({ showAdvancedPLL: show }),

    // --- НОВАЯ СЕКЦИЯ: Состояние для раздела F2L ---
    learnedF2Ls: new Set(),
    searchTermF2L: '',
    activeFilterF2L: 'all',
    showAdvancedF2L: false,
    initializeLearnedF2Ls: async () => {
        const { value } = await Preferences.get({ key: 'learnedF2Ls' });
        if (value) {
            set({ learnedF2Ls: new Set(JSON.parse(value)) });
        }
    },
    toggleLearnedF2L: (id) => {
        const newLearned = new Set(get().learnedF2Ls);
        if (newLearned.has(id)) {
            newLearned.delete(id);
        } else {
            newLearned.add(id);
        }
        set({ learnedF2Ls: newLearned });
        persistState('learnedF2Ls', Array.from(newLearned));
    },
    resetProgressF2L: () => {
        set({ learnedF2Ls: new Set() });
        persistState('learnedF2Ls', []);
    },
    setSearchTermF2L: (term) => set({ searchTermF2L: term }),
    setActiveFilterF2L: (filter) => set({ activeFilterF2L: filter }),
    setShowAdvancedF2L: (show) => set({ showAdvancedF2L: show }),
}));
