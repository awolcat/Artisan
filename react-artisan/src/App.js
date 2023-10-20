import React from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
// import './App.css';
import Navbar from './components/Navbar';
import About from './components/pages/about';
import Landing from './components/pages/landing';
import Contractors from './components/pages/contractors';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/about' element={<About />} />
        
        <Route path='/contractors' element={<Contractors />} />
      </Routes>
    </Router>
  );
}

export default App;
