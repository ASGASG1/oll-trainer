import React from 'react';

export function ConfirmModal({ isOpen, onConfirm, onCancel }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h3 style={{fontSize: '1.125rem', fontWeight: '700', color: 'var(--text-light)'}}>Сбросить прогресс?</h3>
                <p style={{color: 'var(--slate-500)', marginTop: '0.5rem', marginBottom: '1.5rem'}}>Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя будет отменить.</p>
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem'}}>
                    <button onClick={onCancel} className="btn btn-slate">
                        Отмена
                    </button>
                    <button onClick={onConfirm} className="btn btn-red">
                        Да, сбросить
                    </button>
                </div>
            </div>
        </div>
    );
}
