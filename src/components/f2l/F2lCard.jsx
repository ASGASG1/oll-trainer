import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';
import { hapticImpact } from '../../hooks/useNativeFeatures';
import { Clipboard } from '@capacitor/clipboard';
import toast from 'react-hot-toast';
import { ClipboardIcon } from '../common/Icons';

export function F2lCard({ f2l, onOpenPlayer }) {
    const learnedF2Ls = useAppStore((state) => state.learnedF2Ls);
    const toggleLearnedF2L = useAppStore((state) => state.toggleLearnedF2L);
    const isLearned = learnedF2Ls.has(f2l.id);

    const handleToggle = () => {
        toggleLearnedF2L(f2l.id);
        hapticImpact();
    };

    const handleCopy = async () => {
        await Clipboard.write({ string: f2l.alg });
        toast.success('Скопировано!');
        hapticImpact();
    };

    const cardClassName = `oll-card ${isLearned ? 'learned' : ''}`;
    const checkmarkVariants = {
      hidden: { scale: 0.5, opacity: 0 },
      visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 30 } },
    };

    return (
        <motion.article layout className={cardClassName}>
            <div className="oll-card-image-wrapper">
                <img className="oll-card-image" src={f2l.image} alt={f2l.name} onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/112x112/e2e8f0/94a3b8?text=F2L+${f2l.numId}`; }} />
            </div>
            <div className="oll-card-content-wrapper">
                <div className="oll-card-overlay">
                    <span className="oll-card-number">{f2l.numId}</span>
                    <label className="oll-card-learned-toggle" title="Отметить как выученный">
                        <input type="checkbox" checked={isLearned} onChange={handleToggle} style={{position: 'absolute', opacity: 0, width: 0, height: 0}} />
                        <motion.div className="oll-card-learned-toggle-circle" whileTap={{ scale: 0.9 }}>
                             <motion.svg variants={checkmarkVariants} initial="hidden" animate={isLearned ? "visible" : "hidden"} style={{width: '70%', height: '70%', color: 'white'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                             </motion.svg>
                        </motion.div>
                    </label>
                </div>
                <h4 className="oll-card-title">{f2l.name}</h4>
                <div className="oll-card-alg-wrapper">
                    <div className="alg-container">
                        <button onClick={() => onOpenPlayer({ alg: f2l.alg, name: f2l.name, stage: 'F2L' })} className="oll-card-alg">
                            {f2l.alg}
                        </button>
                        <button onClick={handleCopy} className="copy-btn" title="Копировать алгоритм">
                            <ClipboardIcon />
                        </button>
                    </div>
                </div>
            </div>
        </motion.article>
    );
}
