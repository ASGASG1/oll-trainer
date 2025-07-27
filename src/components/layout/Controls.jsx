import React, { useState, useRef, useEffect } from 'react';
import { useOll } from '../../context/OllContext';
import { ConfirmModal } from '../modal/ConfirmModal';
import { SearchIcon, ShuffleIcon, FilterIcon, XIcon } from '../common/Icons';

const Controls = ({ setTrainingCardId, setShowAnswer }) => {
    const {
        filteredOLLs,
        learnedSet,
        resetProgress,
        searchTerm,
        setSearchTerm,
        activeFilter,
        setActiveFilter,
        showAdvanced,
        setShowAdvanced
    } = useOll();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const searchInputRef = useRef(null);
    
    // ИСПРАВЛЕНИЕ: Создаем ref для всей панели управления
    const controlsPanelRef = useRef(null);

    useEffect(() => {
        if (isSearchVisible) {
            searchInputRef.current?.focus();
        }
    }, [isSearchVisible]);

    // ИСПРАВЛЕНИЕ: Логика теперь проверяет клик вне всей панели
    useEffect(() => {
        function handleClickOutside(event) {
            if (controlsPanelRef.current && !controlsPanelRef.current.contains(event.target)) {
                setIsSearchVisible(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []); // Пустой массив зависимостей, чтобы хук сработал один раз

    const handleReset = () => {
        resetProgress();
        setIsModalOpen(false);
    };

    const startTraining = () => {
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
            <div className="controls-sticky-container">
                {/* ИСПРАВЛЕНИЕ: Добавляем ref сюда */}
                <div className="controls-panel" ref={controlsPanelRef}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                        {/* ИСПРАВЛЕНИЕ: ref отсюда убран */}
                        <div className="controls-row">
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
                                    placeholder="Поиск по имени или номеру..."
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
                                        Выучено: {learnedSet.size} / 57
                                    </div>
                                    <button onClick={() => setIsModalOpen(true)} className="btn btn-red" style={{fontSize: '0.875rem'}}>Сбросить</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ConfirmModal
                isOpen={isModalOpen}
                onConfirm={handleReset}
                onCancel={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Controls;