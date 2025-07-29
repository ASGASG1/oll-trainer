import { useState } from 'react';

// Этот хук управляет состоянием UI для страницы с алгоритмами
export const usePageLogic = () => {
    const [trainingCardId, setTrainingCardId] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    const [playerState, setPlayerState] = useState({ 
        isOpen: false, 
        alg: null, 
        name: null, 
        stage: null 
    });

    const openPlayer = (data) => setPlayerState({ isOpen: true, ...data });
    const closePlayer = () => setPlayerState({ isOpen: false, alg: null, name: null, stage: null });

    const startTraining = (filteredItems, pageType) => {
        if (filteredItems.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * filteredItems.length);
        const randomCard = filteredItems[randomIndex];
        
        setTrainingCardId(randomCard.id);
        setShowAnswer(false);

        setTimeout(() => {
            document.getElementById(`${pageType}-card-${randomCard.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    return {
        trainingCardId,
        showAnswer,
        setShowAnswer,
        playerState,
        openPlayer,
        closePlayer,
        startTraining
    };
};