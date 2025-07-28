import React, { useState } from 'react';
import { OllProvider } from '../context/OllContext'; // Импортируем провайдер
import Controls from '../components/layout/Controls';
import OllList from '../components/oll/OllList';

const OllPageContent = () => {
    const [trainingCardId, setTrainingCardId] = useState(null);
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <>
            <Controls 
                setTrainingCardId={setTrainingCardId}
                setShowAnswer={setShowAnswer}
            />
            <main style={{ marginTop: '2rem' }}>
                <OllList 
                    trainingCardId={trainingCardId}
                    showAnswer={showAnswer}
                    setShowAnswer={setShowAnswer}
                />
            </main>
        </>
    );
};

// Оборачиваем страницу в её собственный провайдер
const OllPage = () => {
    return (
        <OllProvider>
            <OllPageContent />
        </OllProvider>
    )
}

export default OllPage;