import React, { useMemo } from 'react';
import { useAppStore } from '../store/appStore';
import { usePageLogic } from '../hooks/usePageLogic';
import ControlsPanel from '../components/common/ControlsPanel';
import PlayerModal from '../components/modal/PlayerModal';
import { F2lCard } from '../components/f2l/F2lCard';
import { motion, AnimatePresence } from 'framer-motion';
import { f2lData } from '../data/f2lData';

const F2lList = ({ onOpenPlayer }) => {
    const searchTerm = useAppStore(state => state.searchTermF2L);
    const activeFilter = useAppStore(state => state.activeFilterF2L);
    const learnedSet = useAppStore(state => state.learnedF2Ls);

    const filteredF2Ls = useMemo(() => {
        return f2lData.filter(item => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = 
                item.name.toLowerCase().includes(searchLower) || 
                String(item.numId).includes(searchLower);

            if (!matchesSearch) return false;

            if (activeFilter === 'learned') return learnedSet.has(item.id);
            if (activeFilter === 'unlearned') return !learnedSet.has(item.id);
            return true;
        });
    }, [searchTerm, activeFilter, learnedSet]);

    const groupedF2Ls = useMemo(() => {
        return filteredF2Ls.reduce((acc, f2l) => {
            (acc[f2l.group] = acc[f2l.group] || []).push(f2l);
            return acc;
        }, {});
    }, [filteredF2Ls]);

    if (filteredF2Ls.length === 0) {
        return <div style={{textAlign: 'center', padding: '5rem 0'}}><h3 style={{fontSize: '1.5rem', fontWeight: '700'}}>Ничего не найдено</h3></div>;
    }

    return (
        <>
            {Object.entries(groupedF2Ls).map(([group, f2ls]) => (
                <section key={group} style={{marginBottom: '3rem'}}>
                    <h3 style={{fontFamily: 'serif', fontSize: '1.875rem', fontWeight: '700', textAlign: 'center', marginBottom: '2rem'}}>{group}</h3>
                    <motion.div layout className="card-grid">
                        <AnimatePresence>
                            {f2ls.map(f2l => (
                                <motion.div layout key={f2l.id} id={`f2l-card-${f2l.id}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
                                    <F2lCard 
                                        f2l={f2l} 
                                        onOpenPlayer={onOpenPlayer}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </section>
            ))}
        </>
    );
};

const F2lPage = () => {
    // Для F2L пока не нужен режим тренировки, поэтому берем только часть логики
    const { playerState, openPlayer, closePlayer } = usePageLogic();

    return (
        <>
            {/* Добавляем панель управления для F2L */}
            <ControlsPanel pageType="f2l" />
            <main style={{ marginTop: '2rem' }}>
                <F2lList 
                    onOpenPlayer={openPlayer}
                />
            </main>
            <PlayerModal {...playerState} onClose={closePlayer} />
        </>
    );
};

export default F2lPage;
