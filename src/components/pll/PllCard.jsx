import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';
import { hapticImpact } from '../../hooks/useNativeFeatures';
import { Clipboard } from '@capacitor/clipboard';
import toast from 'react-hot-toast';
import { ClipboardIcon } from '../common/Icons';

// Маленькие иконки-стрелки
const ChevronLeft = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>;
const ChevronRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>;

export function PllCard({ pll, isTraining, showAnswer, onShowAnswer, onOpenPlayer }) {
    // Исправляем способ получения данных из Zustand, чтобы избежать лишних ререндеров
    const learnedPLLs = useAppStore(state => state.learnedPLLs);
    const toggleLearnedPLL = useAppStore(state => state.toggleLearnedPLL);
    const selectedAlgIndexes = useAppStore(state => state.selectedAlgIndexes);
    const setSelectedAlgIndex = useAppStore(state => state.setSelectedAlgIndex);

    const isLearned = learnedPLLs.has(pll.id);
    const caseId = `pll-${pll.id}`;
    const algIndex = selectedAlgIndexes[caseId] || 0;
    
    // Проверка на случай, если в данных нет массива algs
    if (!pll.algs || pll.algs.length === 0) {
        return <div>Ошибка: нет данных об алгоритмах.</div>;
    }
    const currentAlg = pll.algs[algIndex];

    const handleToggle = () => {
        toggleLearnedPLL(pll.id);
        hapticImpact();
    };

    const handleCopy = async () => {
        await Clipboard.write({ string: currentAlg.alg });
        toast.success('Скопировано!');
        hapticImpact();
    };

    const changeAlg = (direction) => {
        const newIndex = (algIndex + direction + pll.algs.length) % pll.algs.length;
        setSelectedAlgIndex(caseId, newIndex);
        hapticImpact();
    };

    const cardClassName = `oll-card ${isLearned ? 'learned' : ''} ${isTraining ? 'training' : ''}`;
    const checkmarkVariants = {
      hidden: { scale: 0.5, opacity: 0 },
      visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 30 } },
    };

    return (
        <motion.article layout className={cardClassName}>
            <div className="oll-card-image-wrapper">
                <img className="oll-card-image" src={pll.image} alt={`PLL ${pll.name}`} onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/112x112/e2e8f0/94a3b8?text=${pll.id}`; }} />
            </div>
            <div className="oll-card-content-wrapper">
                <div className="oll-card-overlay">
                    <span className="oll-card-number">{pll.numId}</span>
                    <label className="oll-card-learned-toggle" title="Отметить как выученный">
                        <input type="checkbox" checked={isLearned} onChange={handleToggle} style={{position: 'absolute', opacity: 0, width: 0, height: 0}}/>
                        <motion.div className="oll-card-learned-toggle-circle" whileTap={{ scale: 0.9 }}>
                             <motion.svg variants={checkmarkVariants} initial="hidden" animate={isLearned ? "visible" : "hidden"} style={{width: '70%', height: '70%', color: 'white'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                             </motion.svg>
                        </motion.div>
                    </label>
                </div>
                <h4 className="oll-card-title">{pll.name}</h4>
                <div className="oll-card-alg-wrapper">
                     {isTraining && !showAnswer ? (
                        <button onClick={onShowAnswer} className="btn btn-blue" style={{width: '100%'}}>Показать ответ</button>
                    ) : (
                        <div className="alg-container">
                            <button onClick={() => onOpenPlayer({ alg: currentAlg.alg, name: pll.name, stage: 'PLL' })} className="oll-card-alg">
                                {currentAlg.alg}
                            </button>
                            <button onClick={handleCopy} className="copy-btn" title="Копировать алгоритм">
                                <ClipboardIcon />
                            </button>
                        </div>
                    )}
                </div>
                {pll.algs.length > 1 && (
                    <div className="alg-switcher-container">
                        <button onClick={() => changeAlg(-1)} className="alg-switcher-btn"><ChevronLeft /></button>
                        <div className="alg-info">
                            {algIndex + 1} / {pll.algs.length} {currentAlg.source && `(${currentAlg.source})`}
                        </div>
                        <button onClick={() => changeAlg(1)} className="alg-switcher-btn"><ChevronRight /></button>
                    </div>
                )}
            </div>
        </motion.article>
    );
}
