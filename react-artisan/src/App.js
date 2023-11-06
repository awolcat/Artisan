import React from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import { useState } from "react";
// import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import useToken from './components/useToken';
import Logout from './components/Logout';
import Register from './components/Register';
import PrivateProfile from './components/pages/privateProfile';
import About from './components/pages/about';
import Landing from './components/pages/landing';
import Contractors from './components/pages/contractors';
import Jobs from './components/pages/jobs';
import Profile from './components/pages/contractorProfile';
import Contract from './components/pages/contract';
import Login from './components/pages/login';
import NotFound from './components/pages/notFound';


function App() {

  const {token, setToken, identity, setIdentity} = useToken();
  console.log("APP ", token);
  
  return (
    <Router>
      <Navbar token={token} />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/about' element={<About />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/contractors' element={<Contractors />} />
        <Route path='/contractors/:id' element={<Profile />}/>
        <Route path='/service/:serviceId/contract/:contractor_id' element={token && token !== '' ? <Contract /> : <Login setIdentity={setIdentity} token={token} setToken={setToken}/>} />
        <Route path='/*' element={<NotFound />} />
        <Route path='my_profile' element={<PrivateProfile identity={identity} /> } />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login setIdentity={setIdentity} token={token} setToken={setToken}/>} />
        <Route path='/logout' element={<Logout setIdentity={setIdentity} setToken={setToken}/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;