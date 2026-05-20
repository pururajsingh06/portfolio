import React from 'react';

export default function Toast({ visible, message, type = 'success' }) {
    return (
        <div className="toast-container" id="toast-container">
            <div className={`toast ${visible ? 'show' : ''} ${type}`} id="success-toast">
                <div className="toast-icon">
                    {type === 'success' ? (
                        <i className="fa-solid fa-circle-check" style={{ color: 'var(--accent-primary)' }}></i>
                    ) : (
                        <i className="fa-solid fa-circle-exclamation" style={{ color: 'var(--accent-secondary)' }}></i>
                    )}
                </div>
                <div className="toast-content">
                    <h4>{type === 'success' ? 'Message Dispatched!' : 'Submission Failed'}</h4>
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
}
