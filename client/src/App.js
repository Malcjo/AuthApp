
import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<PublicRoutes> <Login /> </PublicRoutes>} />
          <Route path='/register' element={<PublicRoutes> <Register /> </PublicRoutes>} />
          <Route path='/dashboard' element={<ProtectedRoutes> <Dashboard /> </ProtectedRoutes> } />
        </Routes>
      </Router>

    </div>
  );
}

export default App;


// when component is given into this ProtectedROute
//dashboard eg , checks whether user token is there, will return home componenet
// if user is not there, will return to login screen

export function ProtectedRoutes({children}){
  const auth = localStorage.getItem("data");// "data" from login.js local storage
  if(auth){
    return children;
  }else{
    return <Navigate to='/' /> // '/' is the route for login page 
  }
}

export function PublicRoutes({children}){
  const auth = localStorage.getItem("data");// "data" from login.js local storage
  if(auth){
    return <Navigate to='/dashboard' />
  }else{
    return children;
  }
}