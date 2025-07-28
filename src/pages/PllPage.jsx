import React, { useState, useRef, useEffect } from 'react';
import { PllProvider, usePll } from '../context/PllContext';
import { ConfirmModal } from '../components/modal/ConfirmModal';
import { SearchIcon, ShuffleIcon, FilterIcon, XIcon } from '../components/common/Icons';
import { PllCard } from '../components/pll/PllCard';
import { motion, AnimatePresence } from 'framer-motion';

// Адаптируем Controls, добавив логику сворачивания поиска
const PllControls = ({ setTrainingCardId, setShowAnswer }) => {
    const {
        filteredPLLs, learnedSet, resetProgress, searchTerm,
        setSearchTerm, activeFilter, setActiveFilter, showAdvanced, setShowAdvanced
    } = usePll();

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

    const startTraining = () => {
        if (filteredPLLs.length === 0) return;
        const randomIndex = Math.floor(Math.random() * filteredPLLs.length);
        const randomCard = filteredPLLs[randomIndex];
        setTrainingCardId(randomCard.id);
        setShowAnswer(false);
        setTimeout(() => {
            document.getElementById(`pll-card-${randomCard.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    return (
        <>
            <div className="controls-sticky-container">
                <div className="controls-panel" ref={controlsPanelRef}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                        <div className="controls-row">
                             <div className="buttons-wrapper">
                                <button onClick={() => setIsSearchVisible(!isSearchVisible)} className="btn btn-slate btn-icon" aria-label="Открыть/Закрыть поиск">
                                    <SearchIcon style={{width: '1.25rem', height: '1.25rem'}} />
                                </button>
                            </div>
                            <div className="buttons-wrapper" style={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                                <button onClick={startTraining} className="btn btn-blue has-icon-only" title="Случайный алгоритм">
                                    <span className="btn-icon-only"><ShuffleIcon style={{width: '1.25rem', height: '1.25rem'}} /></span>
                                    <span className="btn-text">Случайный</span>
                                </button>
                                <button onClick={() => setShowAdvanced(!showAdvanced)} className="btn btn-slate has-icon-only" title="Фильтры и прогресс">
                                    <span className="btn-icon-only"><FilterIcon style={{width: '1.25rem', height: '1.25rem'}} /></span>
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
                                        Выучено: {learnedSet.size} / 21
                                    </div>
                                    <button onClick={() => setIsModalOpen(true)} className="btn btn-red" style={{fontSize: '0.875rem'}}>Сбросить</button>
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

const PllList = ({ trainingCardId, showAnswer, setShowAnswer }) => {
    const { groupedPLLs, filteredPLLs } = usePll();

    if (filteredPLLs.length === 0) {
        return <div style={{textAlign: 'center', padding: '5rem 0'}}><h3 style={{fontSize: '1.5rem', fontWeight: '700'}}>Ничего не найдено</h3></div>;
    }

    return (
        <>
            {Object.entries(groupedPLLs).map(([group, plls]) => (
                <section key={group} style={{marginBottom: '3rem'}}>
                    <h3 style={{fontFamily: 'serif', fontSize: '1.875rem', fontWeight: '700', textAlign: 'center', marginBottom: '2rem'}}>{group}</h3>
                    <motion.div layout className="card-grid">
                        <AnimatePresence>
                            {plls.map(pll => (
                                <motion.div layout key={pll.id} id={`pll-card-${pll.id}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
                                    <PllCard pll={pll} isTraining={trainingCardId === pll.id} showAnswer={showAnswer} onShowAnswer={() => setShowAnswer(true)} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </section>
            ))}
        </>
    );
};

// Главный компонент страницы, который объединяет всё
const PllPageContent = () => {
    const [trainingCardId, setTrainingCardId] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <>
            <PllControls setTrainingCardId={setTrainingCardId} setShowAnswer={setShowAnswer} />
            <main style={{ marginTop: '2rem' }}>
                <PllList trainingCardId={trainingCardId} showAnswer={showAnswer} setShowAnswer={setShowAnswer} />
            </main>
        </>
    );
};

// Оборачиваем всё в провайдер
const PllPage = () => {
    return (
        <PllProvider>
            <PllPageContent />
        </PllProvider>
    );
};

export default PllPage;