import React from 'react';
import { motion } from 'framer-motion';
import { useOll } from '../../context/OllContext';

export function OllCard({ oll, isTraining, showAnswer, onShowAnswer }) {
    const { learnedSet, toggleLearned } = useOll();
    const isLearned = learnedSet.has(oll.id);

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
                    src={oll.image} 
                    alt={`OLL ${oll.id} - ${oll.name}`}
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/112x112/e2e8f0/94a3b8?text=OLL+${oll.id}`; }}
                />
            </div>
            
            <div className="oll-card-content-wrapper">
                <div className="oll-card-overlay">
                    <span className="oll-card-number">
                        {oll.id}
                    </span>
                    <label className="oll-card-learned-toggle" title="Отметить как выученный">
                        <input 
                            type="checkbox" 
                            checked={isLearned} 
                            onChange={() => toggleLearned(oll.id)}
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
                    {oll.name || `Алгоритм #${oll.id}`}
                </h4>
                <div className="oll-card-alg-wrapper">
                    {isTraining && !showAnswer ? (
                        <button onClick={onShowAnswer} className="btn btn-blue" style={{width: '100%'}}>
                            Показать ответ
                        </button>
                    ) : (
                        <a 
                            href={`./cub/index.html?stage=OLL&type=alg&alg=${encodeURIComponent(oll.alg)}&view=playback`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="oll-card-alg"
                        >
                            {oll.alg}
                        </a>
                    )}
                </div>
            </div>
        </motion.article>
    );
}