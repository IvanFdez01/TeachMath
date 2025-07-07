import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // para pages

// Pages
import Login from './pages/Login.tsx';
import RegisterUser from './pages/RegisterUser.tsx';
import { AlertProvider } from './context/AlertContext.tsx';
import Alert from './components/Alert.tsx';
import Home from './pages/MainPage.tsx';
import { SessionProvider } from './context/SessionContext.tsx';

const App: React.FC = () => {
    return (
        <SessionProvider> 
        <AlertProvider> 
            <Router>
                <Alert/>
                <Routes> /*Switch*/
                    <Route path="/" element={<Login />} /> 
                    <Route path="/registeruser" element={<RegisterUser />} /> 
                    <Route path="/home" element={<Home />} /> 
                </Routes>
            </Router>
        </AlertProvider>
        </SessionProvider>
      );
};

export default App;