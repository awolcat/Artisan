import React from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import { useState } from "react";
// import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
//import useuser from './components/useuser';
//import useRole from './components/useRole'; 
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

  const [user, setUser] = useState({token: null,
  obj: null,});

  //const [user, setUser] = useState(null);
  
  console.log("APP ", user.token);
  console.log("APP ", user.obj);
  
  return (
    <Router>
      <Navbar token={user.token} />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/about' element={<About />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/contractors' element={<Contractors />} />
        <Route path='/contractors/:id' element={<Profile />}/>
        <Route path='/service/:serviceId/contract/:contractor_id' element={user.token ? <Contract token={user.token} identity={user.obj} setUser={setUser}/> : <Login setUser={setUser} />} />
        <Route path='/*' element={<NotFound />} />
        <Route path='my_profile' element={ user.obj ? <PrivateProfile identity={user.obj} setUser={setUser}/> : <Login setUser={setUser}/> } />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login setUser={setUser} />} />
        <Route path='/logout' element={<Logout setUser={setUser} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;