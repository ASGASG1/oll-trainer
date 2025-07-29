import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from '../common/Icons';

const PlayerModal = ({ isOpen, onClose, alg, name, stage }) => {
    const [iframeSrc, setIframeSrc] = useState('');

    useEffect(() => {
        if (isOpen) {
            // ИЗМЕНЕНИЕ: Заменяем view=playback на view=editor
            const url = `./cub/index.html?stage=${stage}&type=alg&alg=${encodeURIComponent(alg)}&view=playback&name=${encodeURIComponent(name)}&view_mode=mobile`;
            setIframeSrc(url);
        }
    }, [isOpen, alg, name, stage]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="modal-content"
                        style={{ maxWidth: '420px', width: '90vw', height: '75vh', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexShrink: 0 }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', fontFamily: 'serif' }}>{name}</h3>
                            <button onClick={onClose} className="theme-switcher" style={{ position: 'static', transform: 'none' }}>
                                <XIcon />
                            </button>
                        </div>
                        
                        {iframeSrc && (
                            <iframe 
                                src={iframeSrc}
                                title={`Визуализатор для ${name}`}
                                style={{ width: '100%', border: 'none', flexGrow: 1 }}
                            />
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PlayerModal;