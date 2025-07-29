import React, { createContext, useContext, useState, useMemo } from 'react';
import { usePreferences } from '../hooks/usePreferences'; // ИЗМЕНЕНИЕ
import { pllData } from '../data/pllData';

const PllContext = createContext();

export const PllProvider = ({ children }) => {
  const [learnedPLLs, setLearnedPLLs] = usePreferences('learnedPLLs', []); // ИЗМЕНЕНИЕ
  const learnedSet = useMemo(() => new Set(learnedPLLs), [learnedPLLs]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAdvanced, setShowAdvanced] = usePreferences('showAdvancedPLL', false); // ИЗМЕНЕНИЕ

  const toggleLearned = (id) => {
    const newLearned = new Set(learnedSet);
    if (newLearned.has(id)) {
      newLearned.delete(id);
    } else {
      newLearned.add(id);
    }
    setLearnedPLLs(Array.from(newLearned));
  };

  const resetProgress = () => setLearnedPLLs([]);

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

  const value = {
    groupedPLLs,
    filteredPLLs,
    learnedSet,
    toggleLearned,
    resetProgress,
    searchTerm,
    setSearchTerm,
    activeFilter,
    setActiveFilter,
    showAdvanced,
    setShowAdvanced
  };

  return <PllContext.Provider value={value}>{children}</PllContext.Provider>;
};

export const usePll = () => useContext(PllContext);