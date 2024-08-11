import React, { useState } from 'react'
import loginpic from '../assets/sampleLoginPic.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() 
{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginSubmit = (e) => 
  {
    e.preventDefault();
    const userData = {
      email, password
    }

    //try to login
    try {
      axios.post('/auth/login', userData)
        .then(log => {
          if (log.data.success) {
            //console.log(userData);
            toast.success(log.data.msg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            localStorage.setItem("data", JSON.stringify(log.data.token));
            navigate('/dashboard');
          }
          else {
            toast.error(log.data.msg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='row bgcolor py-4'>
      <h2 className='text-white text-center'> Welcome back!</h2>
      <div className='col-md-6'>
        <img src={loginpic} width='450px' height='450px' alt='sample login pic' />
      </div>
      <div className='col-md-4 py-5 mt-3'>
        <div className='card p-3 bg-white'>
          <h2>Login</h2>
          <form onSubmit={loginSubmit} className='mt-5 mx-4'>
            <div className='form-group'>
              <h5>Email address</h5>
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='form-control' placeholder='Enter Email' required autoFocus />
            </div>
            <div className='form-group mt-4'>
              <h5>Enter Password</h5>
              <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='form-control' placeholder='password' required />
            </div>
            <div className='text-center'>
              <button type='submit' className='mt-5 submit-btn'>Submit</button>
            </div>
          </form>
          <Link className='text-primary text-center my-3' to='/register'>Not registered? Click here</Link>
        </div>

      </div>
      <ToastContainer />
    </div>
  )
}

export default Login