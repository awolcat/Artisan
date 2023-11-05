import React from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
    import { useState } from "react";
// import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/pages/about';
import Landing from './components/pages/landing';
import Contractors from './components/pages/contractors';
import Jobs from './components/pages/jobs';
import Profile from './components/pages/contractorProfile';
import Contract from './components/pages/contract';
import Login from './components/pages/login';
import NotFound from './components/pages/notFound';


function App() {

  const [loginToken, setLoginToken] = useState(null);

  const setGlobalToken = (usertoken) => {
    setLoginToken(usertoken);
  }
  return (
    <Router>
      <Navbar token={loginToken}/>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/about' element={<About />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/contractors' element={<Contractors />} />
        <Route path='/contractors/:id' element={<Profile />}/>
        <Route path='/service/:serviceId/contract/:contractor_id' element={loginToken ? <Contract /> : <Login setGlobalToken={setGlobalToken} />} />
        <Route path='/*' element={<NotFound />} /> 
        <Route path='/login' element={<Login setGlobalToken={setGlobalToken}/>} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;