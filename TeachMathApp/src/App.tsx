import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // para pages

// Pages
import Login from './pages/login.tsx';

const App: React.FC = () => {
    return (
        <Router>
          <Routes> /*Switch*/
            <Route path="/" element={<Login />} /> 
          </Routes>
        </Router>
      );
};

export default App;