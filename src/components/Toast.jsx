import React from 'react';

export default function Toast({ toastVisible }) {
    return (
        <div className="toast-container" id="toast-container">
            <div className={`toast ${toastVisible ? 'show' : ''}`} id="success-toast">
                <div className="toast-icon">
                    <i className="fa-solid fa-circle-check"></i>
                </div>
                <div className="toast-content">
                    <h4>Message Dispatched!</h4>
                    <p>Thank you. I will reply within 12 hours.</p>
                </div>
            </div>
        </div>
    );
}
