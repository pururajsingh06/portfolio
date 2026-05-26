import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Toast({ visible, message, type = 'success' }) {
    return (
        <div className="toast-container" id="toast-container">
            <div className={`toast ${visible ? 'show' : ''} ${type}`} id="success-toast">
                <div className="toast-icon">
                    {type === 'success' ? (
                        <CheckCircle style={{ color: 'var(--accent-primary)' }} />
                    ) : (
                        <AlertCircle style={{ color: 'var(--accent-secondary)' }} />
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
