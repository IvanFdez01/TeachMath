
import React from 'react';
import { useAlert } from '../context/AlertContext';

const Alert: React.FC = () => {
    // captura los estados del contexto (useAlert implementa useContext(AlertContextProvider))
    const { showAlert, message, hideAlert } = useAlert(); 

    return (
        showAlert && (
        <>
        <div className="p-10 fixed top-0 right-0 left-0 bottom-0 bg-black opacity-90"></div>
        <div className = "bg-mainneutral rounded p-8 fixed top-1/6 left-10 right-10 flex flex-col items-center gap-3">
            <p className = "text-xl text-maindark">{message}</p>
            <button onClick = {hideAlert} className = "bg-secmid rounded py-3 px-6 text-xl text-mainneutral hover:cursor-pointer"><strong>OK</strong></button>
        </div>
        </> 
        )
    );
};

export default Alert;