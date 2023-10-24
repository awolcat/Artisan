import React from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
// import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/pages/about';
import Landing from './components/pages/landing';
import Contractors from './components/pages/contractors';
import Jobs from './components/pages/jobs';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/about' element={<About />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/contractors' element={<Contractors />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;