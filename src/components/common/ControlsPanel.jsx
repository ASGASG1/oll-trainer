import React, { useState, useRef, useEffect } from 'react';
import { ConfirmModal } from '../modal/ConfirmModal';
import { SearchIcon, ShuffleIcon, FilterIcon, XIcon } from './Icons';

const ControlsPanel = ({ context, onStartTraining }) => {
    const {
        filteredItems,
        learnedSet,
        totalCount,
        resetProgress,
        searchTerm,
        setSearchTerm,
        activeFilter,
        setActiveFilter,
        showAdvanced,
        setShowAdvanced
    } = context;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const controlsPanelRef = useRef(null);
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (isSearchVisible) {
            searchInputRef.current?.focus();
        }
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

    return (
        <>
            <div className="controls-sticky-container">
                <div className="controls-panel" ref={controlsPanelRef}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="controls-row">
                            <div className="buttons-wrapper">
                                <button onClick={() => setIsSearchVisible(!isSearchVisible)} className="btn btn-slate btn-icon" aria-label="Открыть/Закрыть поиск">
                                    <SearchIcon style={{ width: '1.25rem', height: '1.25rem' }} />
                                </button>
                            </div>
                            <div className="buttons-wrapper" style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                                <button onClick={() => onStartTraining(filteredItems)} className="btn btn-blue has-icon-only" title="Случайный алгоритм">
                                    <span className="btn-icon-only"><ShuffleIcon style={{ width: '1.25rem', height: '1.25rem' }} /></span>
                                    <span className="btn-text">Случайный</span>
                                </button>
                                <button onClick={() => setShowAdvanced(!showAdvanced)} className="btn btn-slate has-icon-only" title="Фильтры и прогресс">
                                    <span className="btn-icon-only"><FilterIcon style={{ width: '1.25rem', height: '1.25rem' }} /></span>
                                    <span className="btn-text">Фильтры</span>
                                </button>
                            </div>
                        </div>
                        {isSearchVisible && (
                            <div className="search-wrapper" style={{ maxWidth: 'none', marginTop: '1rem' }}>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Поиск по имени или номеру..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
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
                                        <button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}>
                                            {filter.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="progress-wrapper">
                                    <div style={{ fontWeight: '600', fontSize: '0.875rem', backgroundColor: 'var(--slate-200)', color: 'var(--slate-800)', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
                                        Выучено: {learnedSet.size} / {totalCount}
                                    </div>
                                    <button onClick={() => setIsModalOpen(true)} className="btn btn-red" style={{ fontSize: '0.875rem' }}>Сбросить</button>
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