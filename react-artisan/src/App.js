import React from 'react';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import { useState, useEffect } from "react";
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
//import postJob from './components/pages/postJob';
import Login from './components/pages/login';
import NotFound from './components/pages/notFound';


function App() {

  const [user, setUser] = useState({token: null,
  obj: null,});

  async function getIdentity() {
    
        try {
          const role = localStorage.getItem('role');
          let url = '';
          if (role === 'client') {
            url = 'https://' + window.location.hostname + '/current_user';
          } else if (role === 'contractor') {
            url = 'https://' + window.location.hostname + '/current_contractor';
          } else {
            throw EvalError
          }
          const response = await fetch(url, {
              headers: {'Authorization': localStorage.getItem('token'),},
          });
          const result = await response.json();
          setUser({token: localStorage.getItem('token'), obj: result});
          //return (result)
          //console.log("CURRENT_USER", result);
          }
        catch (error) {
          setUser({token: null, obj: null});
        }
      }


  useEffect(() => {getIdentity()}, []);
  
  return (
    <Router>
      <Navbar token={user.token} />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route path='/about' element={<About />} />
        <Route path='/jobs' element={<Jobs identity={user.obj} setUser={setUser}/>} />
        <Route path='/contractors' element={<Contractors />} />
        <Route path='/contractors/:id' element={<Profile identity={user}/>}/>
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
