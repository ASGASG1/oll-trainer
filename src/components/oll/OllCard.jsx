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

export function OllCard({ oll, isTraining, showAnswer, onShowAnswer, onOpenPlayer }) {
    const learnedOLLs = useAppStore(state => state.learnedOLLs);
    const toggleLearnedOLL = useAppStore(state => state.toggleLearnedOLL);
    const selectedAlgIndexes = useAppStore(state => state.selectedAlgIndexes);
    const setSelectedAlgIndex = useAppStore(state => state.setSelectedAlgIndex);

    const isLearned = learnedOLLs.has(oll.id);
    const algIndex = selectedAlgIndexes[`oll-${oll.id}`] || 0;
    const currentAlg = oll.algs[algIndex];

    const handleToggle = () => {
        toggleLearnedOLL(oll.id);
        hapticImpact();
    };

    const handleCopy = async () => {
        await Clipboard.write({ string: currentAlg.alg });
        toast.success('Скопировано!');
        hapticImpact();
    };

    const changeAlg = (direction) => {
        const newIndex = (algIndex + direction + oll.algs.length) % oll.algs.length;
        setSelectedAlgIndex(`oll-${oll.id}`, newIndex);
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
                <img className="oll-card-image" src={oll.image} alt={`OLL ${oll.id} - ${oll.name}`} onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/112x112/e2e8f0/94a3b8?text=OLL+${oll.id}`; }} />
            </div>
            <div className="oll-card-content-wrapper">
                <div className="oll-card-overlay">
                    <span className="oll-card-number">{oll.id}</span>
                    <label className="oll-card-learned-toggle" title="Отметить как выученный">
                        <input type="checkbox" checked={isLearned} onChange={handleToggle} style={{position: 'absolute', opacity: 0, width: 0, height: 0}} />
                        <motion.div className="oll-card-learned-toggle-circle" whileTap={{ scale: 0.9 }}>
                             <motion.svg variants={checkmarkVariants} initial="hidden" animate={isLearned ? "visible" : "hidden"} style={{width: '70%', height: '70%', color: 'white'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                             </motion.svg>
                        </motion.div>
                    </label>
                </div>
                <h4 className="oll-card-title">{oll.name || `Алгоритм #${oll.id}`}</h4>
                <div className="oll-card-alg-wrapper">
                    {isTraining && !showAnswer ? (
                        <button onClick={onShowAnswer} className="btn btn-blue" style={{width: '100%'}}>Показать ответ</button>
                    ) : (
                        <div className="alg-container">
                            <button onClick={() => onOpenPlayer({ alg: currentAlg.alg, name: oll.name || `Алгоритм #${oll.id}`, stage: 'OLL' })} className="oll-card-alg">
                                {currentAlg.alg}
                            </button>
                            <button onClick={handleCopy} className="copy-btn" title="Копировать алгоритм">
                                <ClipboardIcon />
                            </button>
                        </div>
                    )}
                </div>
                {oll.algs.length > 1 && (
                    // --- ИЗМЕНЕНИЕ ЗДЕСЬ: Оборачиваем счетчик и стрелки в один блок ---
                    <div className="alg-switcher-container">
                        <button onClick={() => changeAlg(-1)} className="alg-switcher-btn"><ChevronLeft /></button>
                        <div className="alg-info">
                            {algIndex + 1} / {oll.algs.length} {currentAlg.source && `(${currentAlg.source})`}
                        </div>
                        <button onClick={() => changeAlg(1)} className="alg-switcher-btn"><ChevronRight /></button>
                    </div>
                )}
            </div>
        </motion.article>
    );
}
