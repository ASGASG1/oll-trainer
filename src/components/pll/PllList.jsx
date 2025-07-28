import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pllData } from '../../data/pllData';
import { PllCard } from './PllCard';

const PllList = () => {
    // Пока у нас нет фильтров, просто группируем все данные
    const groupedPLLs = useMemo(() => {
        return pllData.reduce((acc, pll) => {
            (acc[pll.group] = acc[pll.group] || []).push(pll);
            return acc;
        }, {});
    }, []);

    return (
        <>
            {Object.entries(groupedPLLs).map(([group, plls]) => (
                <section key={group} style={{marginBottom: '3rem'}}>
                    <h3 style={{fontFamily: 'serif', fontSize: '1.875rem', fontWeight: '700', textAlign: 'center', marginBottom: '2rem'}}>
                        {group}
                    </h3>
                    <motion.div layout className="card-grid">
                        <AnimatePresence>
                            {plls.map(pll => (
                                <motion.div
                                    layout
                                    key={pll.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <PllCard pll={pll} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </section>
            ))}
        </>
    );
};

export default PllList;