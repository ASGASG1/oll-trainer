import React from 'react';
import { OllProvider, useOll } from '../context/OllContext';
import { usePageLogic } from '../hooks/usePageLogic';
import ControlsPanel from '../components/common/ControlsPanel';
import OllList from '../components/oll/OllList';
import PlayerModal from '../components/modal/PlayerModal';
import { ollData } from '../data/ollData';

const OllPageContent = () => {
    // Получаем всю логику из нашего кастомного хука
    const {
        trainingCardId, showAnswer, setShowAnswer,
        playerState, openPlayer, closePlayer, startTraining
    } = usePageLogic();

    // Получаем данные из контекста OLL
    const ollContext = useOll();
    
    // Создаем объект для передачи в панель управления
    const controlsContext = {
        ...ollContext,
        filteredItems: ollContext.filteredOLLs,
        totalCount: ollData.length
    };

    return (
        <>
            <ControlsPanel 
                context={controlsContext} 
                onStartTraining={(filteredItems) => startTraining(filteredItems, 'oll')} 
            />
            <main style={{ marginTop: '2rem' }}>
                <OllList 
                    trainingCardId={trainingCardId}
                    showAnswer={showAnswer}
                    setShowAnswer={setShowAnswer}
                    onOpenPlayer={openPlayer}
                />
            </main>
            <PlayerModal {...playerState} onClose={closePlayer} />
        </>
    );
};

const OllPage = () => {
    return (
        <OllProvider>
            <OllPageContent />
        </OllProvider>
    )
}

export default OllPage;