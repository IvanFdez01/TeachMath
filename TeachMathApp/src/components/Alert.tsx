
import ReactDOM from 'react-dom';
import { useAlert } from '../context/AlertContext';

const Alert: React.FC = () => {
    // captura los estados del contexto (useAlert implementa useContext(AlertContextProvider))
    const { showAlert, message, hideAlert } = useAlert(); 

    return ReactDOM.createPortal(
        showAlert && (
        <div className="z-50 relative">
            <div className="fixed top-0 right-0 left-0 bottom-0 bg-black opacity-80"></div>
            <div className="z-60 flex flex-col items-center gap-4 fixed top-20 left-20 right-20 bg-white text-black p-6 rounded shadow-lg">
                <h2 className = "text-2xl">{message}</h2>
                <button className = "rounded bg-secmid text-white py-3 px-6" onClick={hideAlert}><strong>OK</strong></button>
            </div>
        </div>

        ),
        document.getElementById('alert-root')!
    );
};

export default Alert;