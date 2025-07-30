import React, { useMemo } from 'react';
import { useAppStore } from '../store/appStore';
import { usePageLogic } from '../hooks/usePageLogic';
import ControlsPanel from '../components/common/ControlsPanel';
import OllList from '../components/oll/OllList';
import PlayerModal from '../components/modal/PlayerModal';

const OllPage = () => {
    const {
        trainingCardId, showAnswer, setShowAnswer,
        playerState, openPlayer, closePlayer, startTraining
    } = usePageLogic();

    return (
        <>
            <ControlsPanel 
                pageType="oll"
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

export default OllPage;