// components/Modal.js
"use client";
import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, headingText,  children }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; // Disable scroll when modal is open
        } else {
            document.body.style.overflow = 'auto'; // Re-enable scroll when modal is closed
        }
        return () => {
            document.body.style.overflow = 'auto'; // Cleanup
        };
    }, [isOpen]);

    // Handle click outside the modal content
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(); // Close modal if clicked on backdrop
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleBackdropClick} // Attach the backdrop click handler
        >
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 relative">
                <div className='w-full flex justify-between items-center'>
                    <h3 className='text-2xl font-normal'>{headingText}</h3>
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        X
                    </button>
                </div>
                <div className='mt-4'>
                    {/* Modal Content */}
                    {children}
                </div>
            </div>
            
        </div>
    );
}
