
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AlertContextType {
    showAlert: boolean;
    message: string;
    showAlertHandler: (msg: string) => void;
    hideAlert : () => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    // states del contexto para manejar las alertas puntuales
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('');

    const showAlertHandler = (msg: string) => {
        setMessage(msg);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000); // Ocultar el alert después de 5 segundos
    };

    const hideAlert = () => {
        setShowAlert(false)
    }

    return (
        <AlertContext.Provider value={{ showAlert, message, showAlertHandler, hideAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export const useAlert = (): AlertContextType => {
    const context = useContext(AlertContext); //
    if (!context) { // no entiendo cuando se da esta excepcion
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};
