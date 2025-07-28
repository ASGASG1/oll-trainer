import React from 'react';
import { motion } from 'framer-motion';
import { usePll } from '../../context/PllContext'; // Используем новый контекст

export function PllCard({ pll, isTraining, showAnswer, onShowAnswer }) {
    const { learnedSet, toggleLearned } = usePll();
    const isLearned = learnedSet.has(pll.id);

    const cardClassName = `oll-card ${isLearned ? 'learned' : ''} ${isTraining ? 'training' : ''}`;
    
    const checkmarkVariants = {
      hidden: { scale: 0.5, opacity: 0 },
      visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 30 } },
    };

    return (
        <motion.article layout className={cardClassName}>
            <div className="oll-card-image-wrapper">
                <img 
                    className="oll-card-image"
                    src={pll.image} 
                    alt={`PLL ${pll.name}`}
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/112x112/e2e8f0/94a3b8?text=${pll.id}`; }}
                />
            </div>
            
            <div className="oll-card-content-wrapper">
                <div className="oll-card-overlay">
                    <span className="oll-card-number">
                        {pll.numId}
                    </span>
                    <label className="oll-card-learned-toggle" title="Отметить как выученный">
                        <input 
                            type="checkbox" 
                            checked={isLearned} 
                            onChange={() => toggleLearned(pll.id)}
                            style={{position: 'absolute', opacity: 0, width: 0, height: 0, cursor: 'pointer'}}
                        />
                        <motion.div 
                          className="oll-card-learned-toggle-circle"
                          whileTap={{ scale: 0.9 }}
                        >
                             <motion.svg 
                                variants={checkmarkVariants}
                                initial="hidden"
                                animate={isLearned ? "visible" : "hidden"}
                                style={{width: '70%', height: '70%', color: 'white'}} 
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                             </motion.svg>
                        </motion.div>
                    </label>
                </div>
                <h4 className="oll-card-title">
                    {pll.name}
                </h4>
                <div className="oll-card-alg-wrapper">
                     {isTraining && !showAnswer ? (
                        <button onClick={onShowAnswer} className="btn btn-blue" style={{width: '100%'}}>
                            Показать ответ
                        </button>
                    ) : (
                        <a 
                            href={`./cub/index.html?stage=PLL&type=alg&alg=${encodeURIComponent(pll.alg)}&view=playback`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="oll-card-alg"
                        >
                            {pll.alg}
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}