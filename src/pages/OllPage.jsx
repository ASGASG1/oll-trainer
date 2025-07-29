import React, { useState } from 'react';
import { OllProvider } from '../context/OllContext';
import Controls from '../components/layout/Controls';
import OllList from '../components/oll/OllList';
import PlayerModal from '../components/modal/PlayerModal'; // Импортируем модальное окно

const OllPageContent = () => {
    const [trainingCardId, setTrainingCardId] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);
    
    // Состояние для модального окна
    const [playerState, setPlayerState] = useState({ isOpen: false, alg: null, name: null, stage: null });

    // Функция для открытия
    const openPlayer = (data) => setPlayerState({ isOpen: true, ...data });
    // Функция для закрытия
    const closePlayer = () => setPlayerState({ isOpen: false, alg: null, name: null, stage: null });

    return (
        <>
            {/* УБИРАЕМ ТЕСТОВЫЙ ПЛЕЕР */}
            <Controls 
                setTrainingCardId={setTrainingCardId}
                setShowAnswer={setShowAnswer}
            />
            <main style={{ marginTop: '2rem' }}>
                <OllList 
                    trainingCardId={trainingCardId}
                    showAnswer={showAnswer}
                    setShowAnswer={setShowAnswer}
                    onOpenPlayer={openPlayer} // Передаем функцию
                />
            </main>
            {/* Рендерим модальное окно */}
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