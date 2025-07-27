import React, { useState, useEffect, useMemo, useRef } from 'react';
// ИМПОРТ: Добавляем framer-motion для анимаций
import { motion, AnimatePresence } from 'framer-motion';
// Мы будем обращаться к плагинам через глобальный объект window.Capacitor, чтобы избежать ошибок сборки.

// --- СТИЛИ (CSS-in-JS, замена для Tailwind) ---
const AppStyles = () => (
  <style>{`
    :root {
      --bg-light: #f1f5f9;
      --bg-dark: #0f172a;
      --text-light: #1e293b;
      --text-dark: #e2e8f0;
      --card-bg-light: rgba(255, 255, 255, 0.8);
      --card-bg-dark: rgba(30, 41, 59, 0.8);
      --border-light: #e2e8f0;
      --border-dark: #334155;
      --blue-500: #3b82f6;
      --blue-600: #2563eb;
      --blue-700: #1d4ed8;
      --green-500: #22c55e;
      --red-600: #dc2626;
      --red-700: #b91c1c;
      --slate-200: #e2e8f0;
      --slate-300: #cbd5e1;
      --slate-400: #94a3b8;
      --slate-500: #64748b;
      --slate-600: #475569;
      --slate-700: #334155;
      --slate-800: #1e293b;
      --slate-900: #0f172a;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    .dark {
      --bg-light: var(--bg-dark);
      --text-light: var(--text-dark);
      --card-bg-light: var(--card-bg-dark);
      --border-light: var(--border-dark);
    }

    body {
      background-color: var(--bg-light);
      color: var(--text-light);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      transition: background-color 0.3s, color 0.3s;
      -webkit-tap-highlight-color: transparent;
      overflow-x: hidden;
    }
    
    .app-container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem 3rem;
    }

    /* Header */
    .app-header {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1.5rem 0;
      border-bottom: 1px solid var(--border-light);
      position: relative;
    }
    .app-nav a {
      font-family: serif;
      font-size: 1.25rem;
      font-weight: 700;
      text-decoration: none;
      margin: 0 1rem;
      color: var(--slate-500);
      transition: color 0.2s;
      padding: 0.5rem;
    }
    .app-nav a:hover { color: var(--text-light); }
    .app-nav a.active { color: var(--blue-600); }
    .dark .app-nav a.active { color: var(--blue-500); }

    .theme-switcher {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 9999px;
      color: var(--slate-500);
    }
    .theme-switcher:hover { background-color: var(--slate-200); }
    .dark .theme-switcher:hover { background-color: var(--slate-700); }

    /* Controls */
    .controls-sticky-container {
      position: sticky;
      top: 0;
      z-index: 40;
      padding: 1rem 0;
      background-color: rgba(241, 245, 249, 0.8);
      backdrop-filter: blur(8px);
    }
    .dark .controls-sticky-container {
      background-color: rgba(15, 23, 42, 0.8);
    }
    .controls-panel {
      background-color: var(--card-bg-light);
      padding: 1rem;
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      border: 1px solid var(--border-light);
    }
    .search-input {
      width: 100%;
      padding: 0.75rem 2.5rem 0.75rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid var(--slate-300);
      background-color: #fff;
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
      font-size: 1rem;
    }
    .dark .search-input {
        border-color: var(--slate-600);
        background-color: var(--slate-700);
    }
    .search-input:focus {
      border-color: var(--blue-500);
      box-shadow: 0 0 0 2px var(--blue-500);
    }
    .btn {
      padding: 0.75rem 1.25rem;
      border-radius: 0.5rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s, transform 0.2s;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    .btn-icon {
      padding: 0.75rem;
    }
    .btn:hover { transform: scale(1.05); }
    .btn:active { transform: scale(0.98); }
    .btn-blue { background-color: var(--blue-600); color: white; }
    .btn-blue:hover { background-color: var(--blue-700); }
    .btn-slate { background-color: var(--slate-200); color: var(--slate-800); }
    .dark .btn-slate { background-color: var(--slate-700); color: var(--slate-200); }
    .btn-red { background-color: var(--red-600); color: white; }
    .btn-red:hover { background-color: var(--red-700); }

    .controls-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .search-wrapper {
      position: relative;
      width: 100%;
    }
    .buttons-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .filter-buttons-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: var(--bg-light);
      padding: 0.25rem;
      border-radius: 0.5rem;
      flex-wrap: wrap;
    }
    .progress-wrapper {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .filter-btn {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-weight: 600;
      border: none;
      cursor: pointer;
      background-color: transparent;
      color: var(--slate-600);
      transition: all 0.2s;
    }
    .dark .filter-btn {
      color: var(--slate-300);
    }
    .filter-btn:hover {
      background-color: var(--slate-200);
    }
    .dark .filter-btn:hover {
      background-color: var(--slate-700);
    }
    .filter-btn.active {
      background-color: white;
      color: var(--blue-600);
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    }
    .dark .filter-btn.active {
      background-color: var(--slate-600);
      color: white;
    }

    /* Card Grid */
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1rem;
    }
    
    /* OLL Card */
    .oll-card {
      position: relative;
      display: flex; 
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background-color: var(--card-bg-light);
      border: 1px solid var(--border-light);
      border-radius: 0.75rem;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
      backdrop-filter: blur(4px);
      transition: all 0.3s;
      text-align: left;
      width: 100%; 
      height: 100%;
    }
    .oll-card:hover {
        transform: scale(1.02);
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    }
    .oll-card.learned { opacity: 0.6; }
    .oll-card.training {
        transform: scale(1.02);
        box-shadow: 0 0 0 4px var(--blue-500);
    }
    
    .oll-card-image-wrapper {
      position: relative;
      flex-shrink: 0;
      width: 6rem;
      height: 6rem;
    }
    
    .oll-card-image {
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
    }
    
    .oll-card-content-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        min-width: 0;
        height: 100%;
    }
    
    .oll-card-title {
        height: auto;
        padding-top: 2.5rem; 
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 1rem;
        font-weight: 600;
    }

    .oll-card-alg-wrapper {
        height: auto;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .oll-card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1;
      pointer-events: none;
    }
    
    .oll-card-number {
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--slate-300);
      pointer-events: auto;
    }
    .oll-card-learned-toggle {
      cursor: pointer;
      pointer-events: auto;
    }
    
    .oll-card-learned-toggle-circle {
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 9999px;
      background-color: var(--slate-200);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }
    
    .dark .oll-card-learned-toggle-circle {
        background-color: var(--slate-700);
    }
    
    .oll-card-learned-toggle input:checked + .oll-card-learned-toggle-circle {
        background-color: var(--green-500);
    }

    .oll-card-alg {
      font-family: monospace;
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--blue-600);
      background-color: #dbeafe;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      text-decoration: none;
      display: inline-block;
      transition: background-color 0.2s, color 0.2s;
      word-break: break-all;
    }
    .dark .oll-card-alg {
      color: #93c5fd;
      background-color: rgba(59, 130, 246, 0.15);
    }
    .oll-card-alg:hover { background-color: #bfdbfe; }
    .dark .oll-card-alg:hover { 
      background-color: rgba(59, 130, 246, 0.25);
      color: #dbeafe;
    }

    /* Modal */
    .modal-overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(0,0,0,0.6);
        backdrop-filter: blur(4px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
    }
    .modal-content {
        background-color: white;
        border-radius: 0.75rem;
        box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        padding: 2rem;
        margin: 1rem;
        max-width: 24rem;
        width: 100%;
    }
    .dark .modal-content { background-color: var(--slate-800); }
    
    .btn-text {
        display: block;
    }
    .btn-icon-only {
        display: none;
    }

    /* --- УЛУЧШЕНИЯ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ --- */
    @media (max-width: 767px) {
      .btn-text {
          display: none;
      }
      .btn-icon-only {
          display: block;
      }
      .btn.has-icon-only {
        padding: 0.75rem;
      }
    }

    @media (max-width: 639px) {
      .app-container {
        padding: 0 0.75rem 2rem;
      }
      .app-nav a {
        font-size: 1.1rem;
        margin: 0 0.25rem;
        padding: 0.5rem;
      }
      main section h3 {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
      }
      .btn {
        padding: 0.75rem 1rem;
        font-size: 0.9rem;
      }
    }
  `}</style>
);


// --- ИКОНКИ (встроенные SVG для простоты) ---
const SunIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path>
    <path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path>
    <path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
  </svg>
);

const MoonIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
);

const XIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const SearchIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const ShuffleIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line>
        <polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line>
        <line x1="4" y1="4" x2="9" y2="9"></line>
    </svg>
);

const FilterIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
);


// --- ДАННЫЕ АЛГОРИТМОВ ---
const ollData = [
    { id: 1, group: "Подняты все боковушки", name: "Глаза", alg: "R2 D R' U2' R D' R' U2' R'", image: "./files/oll1.gif" },
    { id: 2, group: "Подняты все боковушки", name: "Уши", alg: "Rw U R' U' Rw' F R F'", image: "./files/oll2.gif" },
    { id: 3, group: "Подняты все боковушки", name: "Восьмёрка", alg: "F' Rw U R' U' Rw' F R", image: "./files/oll3.gif" },
    { id: 4, group: "Подняты все боковушки", name: "Рыбка По часовой", alg: "(R U R' U) (R U2' R')", image: "./files/oll4.gif" },
    { id: 5, group: "Подняты все боковушки", name: "Рыбка обратная", alg: "(R U2 R' U') (R U' R')", image: "./files/oll5.gif" },
    { id: 6, group: "Подняты все боковушки", name: "Вертолёт", alg: "(R U2) (R2' U') (R2 U') (R2' U2' R)", image: "./files/oll6.gif" },
    { id: 7, group: "Подняты все боковушки", name: "Двойные глаза", alg: "(R U2 R' U') (R U R' U') R U' R'", image: "./files/oll7.gif" },
    { id: 8, group: "Углы правильно ориентированы", name: "Воздушный змей", alg: "Rw U R' U' M (U R U' R')", image: "./files/oll8.gif" },
    { id: 9, group: "Углы правильно ориентированы", name: "Буква Н", alg: "(R U R' U') M' U R U' Rw'", image: "./files/oll9.gif" },
    { id: 10, group: "Углы правильно ориентированы", name: "Снежинка", alg: "M U (R U R' U') M2' U R U' Rw'", image: "./files/oll10.gif" },
    { id: 11, group: "Ни одна боковушка не поднята", name: "Точка в коридоре", alg: "R U2' (R2' F R F') U2' (R' F R F')", image: "./files/oll11.gif" },
    { id: 12, group: "Ни одна боковушка не поднята", name: "Точка с блоком", alg: "y F (R U R' U') F' Fw (R U R' U') Fw'", image: "./files/oll12.gif" },
    { id: 13, group: "Ни одна боковушка не поднята", name: "", alg: "(Fw (R U R' U') Fw') U' (F (R U R' U') F')", image: "./files/oll13.gif" },
    { id: 14, group: "Ни одна боковушка не поднята", name: "", alg: "(Fw (R U R' U') Fw') U (F (R U R' U') F')", image: "./files/oll14.gif" },
    { id: 15, group: "Ни одна боковушка не поднята", name: "Миккимаус с бакенбардами", alg: "M U (R U R' U') M' (R' F R F')", image: "./files/oll15.gif" },
    { id: 16, group: "Ни одна боковушка не поднята", name: "Миккимаус с бородой", alg: "y R U2 (R2' F R F') U2 Rw R' U R U' Rw'", image: "./files/oll16.gif" },
    { id: 17, group: "Ни одна боковушка не поднята", name: "Диагональ", alg: "(R U R' U) (R' F R F') U2 (R' F R F')", image: "./files/oll17.gif" },
    { id: 18, group: "Буквы \"Т\"", name: "", alg: "(R U R' U') (R' F R F')", image: "./files/oll18.gif" },
    { id: 19, group: "Буквы \"Т\"", name: "", alg: "F (R U R' U') F'", image: "./files/oll19.gif" },
    { id: 20, group: "\"Пропеллеры\" или \"Zигзаги\"", name: "", alg: "L F' L' U' L U F U' L'", image: "./files/oll20.gif" },
    { id: 21, group: "\"Пропеллеры\" или \"Zигзаги\"", name: "", alg: "R' F (R U R' U') F' U R", image: "./files/oll21.gif" },
    { id: 22, group: "Скобки", name: "", alg: "(R U R2' U') (R' F) (R U) (R U') F'", image: "./files/oll22.gif" },
    { id: 23, group: "Скобки", name: "", alg: "R' U' (R' F R F') U R", image: "./files/oll23.gif" },
    { id: 24, group: "\"Палки\"", name: "", alg: "F (U R U' R') (U R U' R') F'", image: "./files/oll24.gif" },
    { id: 25, group: "\"Палки\"", name: "", alg: "R' F' U' F U' R U R' U R", image: "./files/oll25.gif" },
    { id: 26, group: "\"Палки\"", name: "", alg: "Rw U Rw' (U R U' R') (U R U' R') Rw U' Rw'", image: "./files/oll26.gif" },
    { id: 27, group: "\"Палки\"", name: "", alg: "R U2 R2' U' R U' R' U2 F R F'", image: "./files/oll27.gif" },
    { id: 28, group: "\"Г-шки\"", name: "", alg: "F U R U' R2' F' R U R U' R'", image: "./files/oll28.gif" },
    { id: 29, group: "\"Г-шки\"", name: "", alg: "R' F R U R' F' R F U' F'", image: "./files/oll29.gif" },
    { id: 30, group: "\"Г-шки\"", name: "", alg: "(r U r') (R U R' U') (r U' r')", image: "./files/oll30.gif" },
    { id: 31, group: "\"Г-шки\"", name: "", alg: "(l' U' l) (L' U' L U) (l' U l)", image: "./files/oll31.gif" },
    { id: 32, group: "\"Мягкие знаки\"", name: "", alg: "F (U R U' R') F'", image: "./files/oll32.gif" },
    { id: 33, group: "\"Мягкие знаки\"", name: "", alg: "F' (U' L' U L) F", image: "./files/oll33.gif" },
    { id: 34, group: "\"Мягкие знаки\"", name: "", alg: "L U F' U' L' U L F L'", image: "./files/oll34.gif" },
    { id: 35, group: "\"Мягкие знаки\"", name: "", alg: "R' U' F U R U' R' F' R", image: "./files/oll35.gif" },
    { id: 36, group: "Буквы \"М\"", name: "", alg: "(R U R' U) (R U' R' U') (R' F R F')", image: "./files/oll36.gif" },
    { id: 37, group: "Буквы \"М\"", name: "", alg: "(L' U' L U') (L' U L U) (L F' L' F)", image: "./files/oll37.gif" },
    { id: 38, group: "\"Уголки\", \"Галки\", \"Стелсы\"", name: "", alg: "(r U) (R' U) (R U') (R' U) (R U2' r')", image: "./files/oll38.gif" },
    { id: 39, group: "\"Уголки\", \"Галки\", \"Стелсы\"", name: "", alg: "(l' U') (L U') (L' U) (L U') (L' U2 l)", image: "./files/oll39.gif" },
    { id: 40, group: "\"Уголки\", \"Галки\", \"Стелсы\"", name: "", alg: "l' U l2 U' l2' U' l2 U l'", image: "./files/oll40.gif" },
    { id: 41, group: "\"Уголки\", \"Галки\", \"Стелсы\"", name: "", alg: "r U' r2' U r2 U r2' U' r", image: "./files/oll41.gif" },
    { id: 42, group: "\"Уголки\", \"Галки\", \"Стелсы\"", name: "", alg: "F (R U R' U') (R U R' U') F'", image: "./files/oll42.gif" },
    { id: 43, group: "\"Уголки\", \"Галки\", \"Стелсы\"", name: "", alg: "F' (L' U' L U) (L' U' L U) F", image: "./files/oll43.gif" },
    { id: 44, group: "\"Квадраты\"", name: "", alg: "r U2 R' U' R U' r'", image: "./files/oll44.gif" },
    { id: 45, group: "\"Квадраты\"", name: "", alg: "l' U2' L U L' U l", image: "./files/oll45.gif" },
    { id: 46, group: "\"Молнии\"", name: "", alg: "Rw U R' U R U2' Rw'", image: "./files/oll46.gif" },
    { id: 47, group: "\"Молнии\"", name: "", alg: "Lw' U' L U' L' U2 Lw", image: "./files/oll47.gif" },
    { id: 48, group: "\"Молнии\"", name: "", alg: "F (R U R' U') F' U F (R U R' U') F'", image: "./files/oll48.gif" },
    { id: 49, group: "\"Молнии\"", name: "", alg: "M R U R' U R U2' R' U M'", image: "./files/oll49.gif" },
    { id: 50, group: "\"Галстуки\"", name: "", alg: "F R U' R' U' R U R' F'", image: "./files/oll50.gif" },
    { id: 51, group: "\"Галстуки\"", name: "", alg: "(R U2 R') (R' F R F') (R U2' R')", image: "./files/oll51.gif" },
    { id: 52, group: "\"Рюмки\"", name: "", alg: "(R U R' U) (R' F R F') (R U2' R')", image: "./files/oll52.gif" },
    { id: 53, group: "\"Рюмки\"", name: "", alg: "(L' U' L U') (L F' L' F) (L' U2 L)", image: "./files/oll53.gif" },
    { id: 54, group: "\"Петухи\"", name: "", alg: "(R U R' U R U2' R') F (R U R' U') F'", image: "./files/oll54.gif" },
    { id: 55, group: "\"Петухи\"", name: "", alg: "(L' U' L U' L' U2 L) F' (L' U' L U) F", image: "./files/oll55.gif" },
    { id: 56, group: "\"Петухи\"", name: "", alg: "(L' U' L U) L' U L F U F' L' U' L", image: "./files/oll56.gif" },
    { id: 57, group: "\"Петухи\"", name: "", alg: "(R U R' U') R U' R' F' U' F R U R'", image: "./files/oll57.gif" }
];


// --- КОМПОНЕНТЫ ---

function OllCard({ oll, isLearned, onToggleLearned, isTraining, showAnswer, onShowAnswer }) {
    const cardClassName = `oll-card ${isLearned ? 'learned' : ''} ${isTraining ? 'training' : ''}`;
    
    // АНИМАЦИЯ: Варианты для галочки
    const checkmarkVariants = {
      hidden: { scale: 0.5, opacity: 0 },
      visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 30 } },
    };

    return (
        <motion.article layout className={cardClassName}>
            <div className="oll-card-image-wrapper">
                <img 
                    className="oll-card-image"
                    src={oll.image} 
                    alt={`OLL ${oll.id} - ${oll.name}`}
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/112x112/e2e8f0/94a3b8?text=OLL+${oll.id}`; }}
                />
            </div>
            
            <div className="oll-card-content-wrapper">
                <div className="oll-card-overlay">
                    <span className="oll-card-number">
                        {oll.id}
                    </span>
                    <label className="oll-card-learned-toggle" title="Отметить как выученный">
                        <input 
                            type="checkbox" 
                            checked={isLearned} 
                            onChange={() => onToggleLearned(oll.id)}
                            style={{position: 'absolute', opacity: 0, width: 0, height: 0, cursor: 'pointer'}}
                        />
                        <motion.div 
                          className="oll-card-learned-toggle-circle"
                          whileTap={{ scale: 0.9 }}
                        >
                             <motion.svg 
                                variants={checkmarkVariants}
                                initial="hidden"
                                animate={isLearned ? "visible" : "hidden"}
                                style={{width: '70%', height: '70%', color: 'white'}} 
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                             </motion.svg>
                        </motion.div>
                    </label>
                </div>
                <h4 className="oll-card-title">
                    {oll.name || `Алгоритм #${oll.id}`}
                </h4>
                <div className="oll-card-alg-wrapper">
                    {isTraining && !showAnswer ? (
                        <button onClick={onShowAnswer} className="btn btn-blue" style={{width: '100%'}}>
                            Показать ответ
                        </button>
                    ) : (
                        <a 
                            href={`./cub/index.html?stage=OLL&type=alg&alg=${encodeURIComponent(oll.alg)}&view=playback`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="oll-card-alg"
                        >
                            {oll.alg}
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

function ConfirmModal({ isOpen, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3 style={{fontSize: '1.125rem', fontWeight: '700', color: 'var(--text-light)'}}>Сбросить прогресс?</h3>
                <p style={{color: 'var(--slate-500)', marginTop: '0.5rem', marginBottom: '1.5rem'}}>Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя будет отменить.</p>
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem'}}>
                    <button onClick={onCancel} className="btn btn-slate">
                        Отмена
                    </button>
                    <button onClick={onConfirm} className="btn btn-red">
                        Да, сбросить
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- ОСНОВНОЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ ---
export default function App() {
    const [theme, setTheme] = useState('light');
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [learnedOLLs, setLearnedOLLs] = useState(new Set());
    const [trainingCardId, setTrainingCardId] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const searchInputRef = useRef(null);
    const searchWrapperRef = useRef(null); 

    const groupedOLLData = useMemo(() => {
        return ollData.reduce((acc, oll) => {
            (acc[oll.group] = acc[oll.group] || []).push(oll);
            return acc;
        }, {});
    }, []); 

    useEffect(() => {
        const CapacitorApp = window.Capacitor?.Plugins?.App;
        
        if (CapacitorApp) {
            const listener = CapacitorApp.addListener('backButton', () => {
                if (isModalOpen) {
                    setIsModalOpen(false);
                } else if (trainingCardId) {
                    setTrainingCardId(null);
                } else if (isSearchVisible) {
                    setIsSearchVisible(false);
                    setSearchTerm('');
                } else if (activeFilter !== 'all') {
                    setActiveFilter('all');
                } else {
                    CapacitorApp.exitApp();
                }
            });

            return () => {
                listener.remove();
            };
        }
    }, [isModalOpen, trainingCardId, isSearchVisible, activeFilter]);


    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        const savedLearned = JSON.parse(localStorage.getItem('learnedOLLs') || '[]');
        setLearnedOLLs(new Set(savedLearned));
        const savedShowAdvanced = JSON.parse(localStorage.getItem('showAdvanced') || 'false');
        setShowAdvanced(savedShowAdvanced);
    }, []);
    
    useEffect(() => {
        if (isSearchVisible) {
            searchInputRef.current?.focus();
        }
    }, [isSearchVisible]);
    
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
                setIsSearchVisible(false);
                setSearchTerm('');
            }
        }

        if (isSearchVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchVisible]);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.className = theme;
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('learnedOLLs', JSON.stringify(Array.from(learnedOLLs)));
    }, [learnedOLLs]);
    
    useEffect(() => {
        localStorage.setItem('showAdvanced', JSON.stringify(showAdvanced));
    }, [showAdvanced]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const toggleLearned = (id) => {
        const newLearned = new Set(learnedOLLs);
        if (newLearned.has(id)) newLearned.delete(id);
        else newLearned.add(id);
        setLearnedOLLs(newLearned);
    };

    const resetProgress = () => {
        setLearnedOLLs(new Set());
        setIsModalOpen(false);
    };

    const filteredOLLs = useMemo(() => {
        return ollData.filter(oll => {
            const matchesSearch = oll.name.toLowerCase().includes(searchTerm.toLowerCase()) || String(oll.id).includes(searchTerm);
            if (activeFilter === 'all') return matchesSearch;
            if (activeFilter === 'learned') return matchesSearch && learnedOLLs.has(oll.id);
            if (activeFilter === 'unlearned') return matchesSearch && !learnedOLLs.has(oll.id);
            return false;
        });
    }, [searchTerm, activeFilter, learnedOLLs]);

    const filteredGroupedData = useMemo(() => {
        return Object.entries(groupedOLLData).reduce((acc, [group, olls]) => {
            const visibleOlls = olls.filter(oll => filteredOLLs.some(fOll => fOll.id === oll.id));
            if (visibleOlls.length > 0) acc[group] = visibleOlls;
            return acc;
        }, {});
    }, [filteredOLLs, groupedOLLData]); 

    const startTraining = () => {
        if (trainingCardId) setTrainingCardId(null);
        if (filteredOLLs.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * filteredOLLs.length);
        const randomCard = filteredOLLs[randomIndex];
        
        setTrainingCardId(randomCard.id);
        setShowAnswer(false);

        setTimeout(() => {
            document.getElementById(`oll-card-${randomCard.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    return (
        <>
            <AppStyles />
            <div className="app-container">
                <header className="app-header">
                    <nav className="app-nav">
                        {['Cross', 'F2L', 'OLL', 'PLL'].map(item => (
                            <a key={item} href="#" className={item === 'OLL' ? 'active' : ''}>{item}</a>
                        ))}
                    </nav>
                    <button onClick={toggleTheme} className="theme-switcher" aria-label="Сменить тему">
                        {theme === 'light' ? <MoonIcon style={{width: '1.5rem', height: '1.5rem'}} /> : <SunIcon style={{width: '1.5rem', height: '1.5rem'}} />}
                    </button>
                </header>

                <div className="controls-sticky-container">
                    <div className="controls-panel">
                        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                            <div className="controls-row" ref={searchWrapperRef}>
                                <div className="buttons-wrapper">
                                    <button onClick={() => setIsSearchVisible(!isSearchVisible)} className="btn btn-slate btn-icon" aria-label="Открыть/Закрыть поиск">
                                        <SearchIcon style={{width: '1.25rem', height: '1.25rem'}} />
                                    </button>
                                </div>
                                <div className="buttons-wrapper" style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                                    <button onClick={startTraining} className="btn btn-blue has-icon-only" title="Случайный алгоритм">
                                        <span className="btn-icon-only"><ShuffleIcon style={{width: '1.25rem', height: '1.25rem'}} /></span>
                                        <span className="btn-text">Случайный алгоритм</span>
                                    </button>
                                    <button onClick={() => setShowAdvanced(!showAdvanced)} className="btn btn-slate has-icon-only" title="Фильтры и прогресс">
                                        <span className="btn-icon-only"><FilterIcon style={{width: '1.25rem', height: '1.25rem'}} /></span>
                                        <span className="btn-text">Фильтры и прогресс</span>
                                    </button>
                                </div>
                            </div>
                            {isSearchVisible && (
                                <div className="search-wrapper" style={{ maxWidth: 'none', marginTop: '1rem' }}>
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        placeholder="Поиск..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="search-input"
                                    />
                                    {searchTerm && (
                                        <button onClick={() => setSearchTerm('')} style={{position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)'}} aria-label="Очистить поиск">
                                           <XIcon style={{width: '1.25rem', height: '1.25rem'}} />
                                        </button>
                                    )}
                                </div>
                            )}
                            {showAdvanced && (
                                <div className="controls-row" style={{marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)'}}>
                                    <div className="filter-buttons-wrapper">
                                        {[{id: 'all', label: 'Все'}, {id: 'unlearned', label: 'Невыученные'}, {id: 'learned', label: 'Выученные'}].map(filter => (
                                            <button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}>
                                                {filter.label}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="progress-wrapper">
                                        <div style={{fontWeight: '600', fontSize: '0.875rem', backgroundColor: 'var(--slate-200)', color: 'var(--slate-800)', padding: '0.5rem 1rem', borderRadius: '0.5rem'}}>
                                            Выучено: {learnedOLLs.size} / 57
                                        </div>
                                        <button onClick={() => setIsModalOpen(true)} className="btn btn-red" style={{fontSize: '0.875rem'}}>Сбросить</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <main style={{marginTop: '2rem'}}>
                    {Object.entries(filteredGroupedData).map(([group, olls]) => (
                        <section key={group} style={{marginBottom: '3rem'}}>
                            <h3 style={{fontFamily: 'serif', fontSize: '1.875rem', fontWeight: '700', textAlign: 'center', marginBottom: '2rem'}}>
                                {group}
                            </h3>
                            {/* АНИМАЦИЯ: Обертка для grid-контейнера */}
                            <motion.div layout className="card-grid">
                                <AnimatePresence>
                                {olls.map(oll => (
                                    // АНИМАЦИЯ: Обертка для каждой карточки
                                    <motion.div
                                        layout
                                        key={oll.id}
                                        id={`oll-card-${oll.id}`}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <OllCard 
                                            oll={oll}
                                            isLearned={learnedOLLs.has(oll.id)}
                                            onToggleLearned={toggleLearned}
                                            isTraining={trainingCardId === oll.id}
                                            showAnswer={showAnswer}
                                            onShowAnswer={() => setShowAnswer(true)}
                                        />
                                    </motion.div>
                                ))}
                                </AnimatePresence>
                            </motion.div>
                        </section>
                    ))}
                    {filteredOLLs.length === 0 && (
                        <div style={{textAlign: 'center', padding: '5rem 0'}}>
                            <h3 style={{fontSize: '1.5rem', fontWeight: '700'}}>Ничего не найдено</h3>
                            <p style={{color: 'var(--slate-500)', marginTop: '0.5rem'}}>Попробуйте изменить фильтры или поисковый запрос.</p>
                        </div>
                    )}
                </main>
            </div>
            
            <ConfirmModal 
                isOpen={isModalOpen}
                onConfirm={resetProgress}
                onCancel={() => setIsModalOpen(false)}
            />
        </>
    );
}
