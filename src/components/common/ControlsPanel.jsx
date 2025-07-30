import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ConfirmModal } from '../modal/ConfirmModal';
import { SearchIcon, ShuffleIcon, FilterIcon, XIcon } from './Icons';
import { useAppStore } from '../../store/appStore';
import { ollData } from '../../data/ollData';
import { pllData } from '../../data/pllData';
import { f2lData } from '../../data/f2lData';
import { hapticImpact } from '../../hooks/useNativeFeatures';

const ControlsPanel = ({ pageType, onStartTraining }) => {
    // --- ИСПРАВЛЕНИЕ: Получаем каждую часть состояния отдельно, чтобы избежать бесконечного цикла ---
    const learnedSet = useAppStore(state => state[`learned${pageType.toUpperCase()}s`]);
    const resetProgress = useAppStore(state => state[`resetProgress${pageType.toUpperCase()}`]);
    const searchTerm = useAppStore(state => state[`searchTerm${pageType.toUpperCase()}`]);
    const setSearchTerm = useAppStore(state => state[`setSearchTerm${pageType.toUpperCase()}`]);
    const activeFilter = useAppStore(state => state[`activeFilter${pageType.toUpperCase()}`]);
    const setActiveFilter = useAppStore(state => state[`setActiveFilter${pageType.toUpperCase()}`]);
    const showAdvanced = useAppStore(state => state[`showAdvanced${pageType.toUpperCase()}`]);
    const setShowAdvanced = useAppStore(state => state[`setShowAdvanced${pageType.toUpperCase()}`]);

    const dataMap = {
        oll: ollData,
        pll: pllData,
        f2l: f2lData
    };
    const totalCount = dataMap[pageType].length;
    // --- КОНЕЦ ИСПРАВЛЕНИЯ ---

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const controlsPanelRef = useRef(null);
    const searchInputRef = useRef(null);

    const filteredData = useMemo(() => {
        const data = dataMap[pageType];
        return data.filter(item => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = 
                item.name.toLowerCase().includes(searchLower) || 
                String(item.id).includes(searchLower) ||
                (item.numId && String(item.numId).includes(searchLower));

            if (!matchesSearch) return false;
            if (activeFilter === 'learned') return learnedSet.has(item.id);
            if (activeFilter === 'unlearned') return !learnedSet.has(item.id);
            return true;
        });
    }, [searchTerm, activeFilter, learnedSet, pageType]);

    useEffect(() => {
        if (isSearchVisible) searchInputRef.current?.focus();
    }, [isSearchVisible]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (controlsPanelRef.current && !controlsPanelRef.current.contains(event.target)) {
                setIsSearchVisible(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleStartTraining = () => {
        onStartTraining(filteredData);
        hapticImpact();
    }

    return (
        <>
            <div className="controls-sticky-container">
                <div className="controls-panel" ref={controlsPanelRef}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="controls-row">
                            <div className="buttons-wrapper">
                                <button onClick={() => { setIsSearchVisible(!isSearchVisible); hapticImpact(); }} className="btn btn-slate btn-icon" aria-label="Открыть/Закрыть поиск">
                                    <SearchIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                                </button>
                            </div>
                            <div className="buttons-wrapper" style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                                {onStartTraining && (
                                    <button onClick={handleStartTraining} className="btn btn-blue has-icon-only" title="Случайный алгоритм">
                                        <span className="btn-icon-only"><ShuffleIcon style={{ width: '1.25rem', height: '1.25rem' }} /></span>
                                        <span className="btn-text">Случайный</span>
                                    </button>
                                )}
                                <button onClick={() => { setShowAdvanced(!showAdvanced); hapticImpact(); }} className="btn btn-slate has-icon-only" title="Фильтры и прогресс">
                                    <span className="btn-icon-only"><FilterIcon style={{ width: '1.25rem', height: '1.25rem' }} /></span>
                                    <span className="btn-text">Фильтры</span>
                                </button>
                            </div>
                        </div>
                        {isSearchVisible && (
                            <div className="search-wrapper" style={{ maxWidth: 'none', marginTop: '1rem' }}>
                                <input ref={searchInputRef} type="text" placeholder="Поиск по имени или номеру..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
                                {searchTerm && (
                                    <button onClick={() => setSearchTerm('')} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }} aria-label="Очистить поиск">
                                        <XIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                                    </button>
                                )}
                            </div>
                        )}
                        {showAdvanced && (
                            <div className="controls-row" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                                <div className="filter-buttons-wrapper">
                                    {[{ id: 'all', label: 'Все' }, { id: 'unlearned', label: 'Невыученные' }, { id: 'learned', label: 'Выученные' }].map(filter => (
                                        <button key={filter.id} onClick={() => { setActiveFilter(filter.id); hapticImpact(); }} className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}>
                                            {filter.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="progress-wrapper">
                                    <div style={{ fontWeight: '600', fontSize: '0.875rem', backgroundColor: 'var(--slate-200)', color: 'var(--slate-800)', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                                        Выучено: {learnedSet.size} / {totalCount}
                                    </div>
                                    <button onClick={() => { setIsModalOpen(true); hapticImpact(); }} className="btn btn-red" style={{ fontSize: '0.875rem' }}>Сбросить</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ConfirmModal isOpen={isModalOpen} onConfirm={() => { resetProgress(); setIsModalOpen(false); }} onCancel={() => setIsModalOpen(false)} />
        </>
    );
};

export default ControlsPanel;
