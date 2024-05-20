import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Email from './pages/Email';
import BulkMail from './pages/BulkMail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/email" element={<Email />} />
        <Route path="/bulkemail" element={<BulkMail />} />
        
      </Routes>
    </Router>
  );
}

export default App;
