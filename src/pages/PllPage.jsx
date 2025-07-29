import React from 'react';
import { PllProvider, usePll } from '../context/PllContext';
import { usePageLogic } from '../hooks/usePageLogic';
import ControlsPanel from '../components/common/ControlsPanel';
import PlayerModal from '../components/modal/PlayerModal';
import { PllCard } from '../components/pll/PllCard';
import { motion, AnimatePresence } from 'framer-motion';
import { pllData } from '../data/pllData';

// PllList теперь является частью этой страницы, так как он уникален для PLL
const PllList = ({ trainingCardId, showAnswer, setShowAnswer, onOpenPlayer }) => {
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

const PllPageContent = () => {
    const {
        trainingCardId, showAnswer, setShowAnswer,
        playerState, openPlayer, closePlayer, startTraining
    } = usePageLogic();

    const pllContext = usePll();

    const controlsContext = {
        ...pllContext,
        filteredItems: pllContext.filteredPLLs,
        totalCount: pllData.length
    };

    return (
        <>
            <ControlsPanel 
                context={controlsContext}
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

const PllPage = () => {
    return (
        <PllProvider>
            <PllPageContent />
        </PllProvider>
    );
};

export default PllPage;