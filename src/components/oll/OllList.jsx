import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOll } from '../../context/OllContext';
import { OllCard } from './OllCard';

const OllList = ({ trainingCardId, showAnswer, setShowAnswer }) => {
    const { groupedOLLs, filteredOLLs } = useOll();

    if (filteredOLLs.length === 0) {
        return (
            <div style={{textAlign: 'center', padding: '5rem 0'}}>
                <h3 style={{fontSize: '1.5rem', fontWeight: '700'}}>Ничего не найдено</h3>
                <p style={{color: 'var(--slate-500)', marginTop: '0.5rem'}}>Попробуйте изменить фильтры или поисковый запрос.</p>
            </div>
        );
    }

    return (
        <>
            {Object.entries(groupedOLLs).map(([group, olls]) => (
                <section key={group} style={{marginBottom: '3rem'}}>
                    <h3 style={{fontFamily: 'serif', fontSize: '1.875rem', fontWeight: '700', textAlign: 'center', marginBottom: '2rem'}}>
                        {group}
                    </h3>
                    <motion.div layout className="card-grid">
                        <AnimatePresence>
                            {olls.map(oll => (
                                <motion.div
                                    layout
                                    key={oll.id}
                                    id={oll-card-}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <OllCard 
                                        oll={oll}
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
        </>
    );
};

export default OllList;
