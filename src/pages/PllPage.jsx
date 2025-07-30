import React, { useMemo } from 'react';
import { useAppStore } from '../store/appStore';
import { usePageLogic } from '../hooks/usePageLogic';
import ControlsPanel from '../components/common/ControlsPanel';
import PlayerModal from '../components/modal/PlayerModal';
import { PllCard } from '../components/pll/PllCard';
import { motion, AnimatePresence } from 'framer-motion';
import { pllData } from '../data/pllData';

const PllList = ({ trainingCardId, showAnswer, setShowAnswer, onOpenPlayer }) => {
    const searchTerm = useAppStore(state => state.searchTermPLL);
    const activeFilter = useAppStore(state => state.activeFilterPLL);
    const learnedSet = useAppStore(state => state.learnedPLLs);

    const filteredPLLs = useMemo(() => {
        return pllData.filter(pll => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = 
                pll.name.toLowerCase().includes(searchLower) || 
                String(pll.numId).includes(searchLower) ||
                pll.id.toLowerCase().includes(searchLower);

            if (!matchesSearch) return false;

            if (activeFilter === 'learned') return learnedSet.has(pll.id);
            if (activeFilter === 'unlearned') return !learnedSet.has(pll.id);
            return true;
        });
    }, [searchTerm, activeFilter, learnedSet]);

    const groupedPLLs = useMemo(() => {
        return filteredPLLs.reduce((acc, pll) => {
            (acc[pll.group] = acc[pll.group] || []).push(pll);
            return acc;
        }, {});
    }, [filteredPLLs]);

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
                                    <PllCard 
                                        pll={pll} 
                                        isTraining={trainingCardId === pll.id} 
                                        showAnswer={showAnswer} 
                                        onShowAnswer={() => setShowAnswer(true)}
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

const PllPage = () => {
    const {
        trainingCardId, showAnswer, setShowAnswer,
        playerState, openPlayer, closePlayer, startTraining
    } = usePageLogic();

    return (
        <>
            <ControlsPanel
                pageType="pll"
                onStartTraining={(filteredItems) => startTraining(filteredItems, 'pll')}
            />
            <main style={{ marginTop: '2rem' }}>
                <PllList 
                    trainingCardId={trainingCardId} 
                    showAnswer={showAnswer} 
                    setShowAnswer={setShowAnswer}
                    onOpenPlayer={openPlayer}
                />
            </main>
            <PlayerModal {...playerState} onClose={closePlayer} />
        </>
    );
};

export default PllPage;