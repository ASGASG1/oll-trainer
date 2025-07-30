import React from 'react';

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
      /* Добавляем отступы для всего body, чтобы фон был правильным */
      padding-top: env(safe-area-inset-top);
      padding-bottom: env(safe-area-inset-bottom);
    }
    
    .app-container {
      max-width: 1280px;
      margin: 0 auto;
      /* --- ИЗМЕНЕНИЕ ЗДЕСЬ --- */
      /* Старые отступы */
      padding-left: 1rem;
      padding-right: 1rem;
      
      /* Новые отступы, которые учитывают "безопасные зоны" телефона */
      /* Сначала идет старое значение как запасной вариант, потом новое */
      padding-top: 1rem; /* Запасной вариант */
      padding-top: max(1rem, env(safe-area-inset-top)); /* Выбираем больший из двух отступов */

      padding-bottom: 3rem; /* Запасной вариант */
      padding-bottom: max(3rem, env(safe-area-inset-bottom)); /* Выбираем больший из двух отступов */
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
      /* --- ИЗМЕНЕНИЕ ЗДЕСЬ --- */
      /* Приклеиваем панель не к самому верху, а с учетом отступа безопасной зоны */
      top: 0; /* Запасной вариант */
      top: env(safe-area-inset-top);
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
    .search-input::placeholder {
      color: var(--slate-400);
    }
    .dark .search-input {
        border-color: var(--slate-600);
        background-color: var(--slate-700);
        color: var(--text-dark);
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
      border: none;
      text-align: inherit;
      cursor: pointer;
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

	/* --- СТИЛИ ДЛЯ КОНТЕЙНЕРА АЛГОРИТМА --- */
	.alg-container {
	    position: relative;
	    display: flex;
	    width: 100%;
	}
	
	.alg-container .oll-card-alg {
	    flex-grow: 1; /* Кнопка с алгоритмом занимает всю ширину */
	    padding-right: 2.5rem; /* Добавляем отступ справа для иконки */
	}
	
	.copy-btn {
	    position: absolute;
	    top: 50%;
	    right: 0.5rem;
	    transform: translateY(-50%);
	    background: none;
	    border: none;
	    padding: 0.5rem;
	    cursor: pointer;
	    color: var(--blue-600);
	    opacity: 0.6;
	    transition: opacity 0.2s, transform 0.2s;
	}
	.dark .copy-btn {
	    color: #93c5fd;
	}
	.copy-btn:hover {
	    opacity: 1;
	    transform: translateY(-50%) scale(1.1);
	}
	.copy-btn svg {
	    width: 1rem;
	    height: 1rem;
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
        /* --- ИЗМЕНЕНИЕ ЗДЕСЬ --- */
        /* Убираем боковые отступы отсюда, так как они теперь в общем правиле .app-container */
        padding-top: 0;
        padding-bottom: 2rem;
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
  `}
  </style>
);

export default AppStyles;