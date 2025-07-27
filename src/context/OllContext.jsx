import React, { createContext, useContext, useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ollData } from '../data/ollData';

const OllContext = createContext();

export const OllProvider = ({ children }) => {
  const [learnedOLLs, setLearnedOLLs] = useLocalStorage('learnedOLLs', []);
  const learnedSet = useMemo(() => new Set(learnedOLLs), [learnedOLLs]);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAdvanced, setShowAdvanced] = useLocalStorage('showAdvanced', false);

  const toggleLearned = (id) => {
    const newLearned = new Set(learnedSet);
    if (newLearned.has(id)) {
      newLearned.delete(id);
    } else {
      newLearned.add(id);
    }
    setLearnedOLLs(Array.from(newLearned));
  };

  const resetProgress = () => setLearnedOLLs([]);

  const filteredOLLs = useMemo(() => {
    return ollData.filter(oll => {
      const matchesSearch = oll.name.toLowerCase().includes(searchTerm.toLowerCase()) || String(oll.id).includes(searchTerm);
      if (!matchesSearch) return false;

      if (activeFilter === 'learned') return learnedSet.has(oll.id);
      if (activeFilter === 'unlearned') return !learnedSet.has(oll.id);
      return true;
    });
  }, [searchTerm, activeFilter, learnedSet]);
  
  const groupedOLLs = useMemo(() => {
    return filteredOLLs.reduce((acc, oll) => {
        (acc[oll.group] = acc[oll.group] || []).push(oll);
        return acc;
    }, {});
  }, [filteredOLLs]);

  const value = {
    groupedOLLs,
    filteredOLLs,
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

  return <OllContext.Provider value={value}>{children}</OllContext.Provider>;
};

export const useOll = () => useContext(OllContext);
