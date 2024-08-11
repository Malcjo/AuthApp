import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {

  const [user, setUser] = useState(null);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();


  const navigate = useNavigate();
  const updateSubmit = async (data) => {
    if (data.password === data.cpassword) {
      const updateUser = {
        email: user.email,
        password: data.password,
        cupassword: data.cupassword
      }
      axios. post('/auth/update', {updateUser})
      .then(res => {
        if(res.data.success){
          toast.success(res.data.msg,{
            position: "top-right",
            autoClose: 2500,
            theme: "colored"
          });
          localStorage.removeItem('data');
          setTimeout(()=>{
            window.location.href = "/"
          }, 3500);
        }else{
          toast.error(res.data.msg,{
            position: "top-right",
            autoClose: 2500,
            theme: "colored"
          });
        }
      })
      .catch(err =>{
        console.log(err);
      })
    }else{
      toast.error("Password's do not match",{
        position: "top-right",
        autoClose: 2500,
        theme: "colored"
      });
    }
  }

  const Logout = () => {
    localStorage.removeItem('data');
    navigate('/');
  }

  const loadData = async () => {
    try {
      const token = await JSON.parse(localStorage.getItem('data'));
      console.log(token);
      const res = await axios.get('/auth/userdata', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(res.data.success){
        setUser(res.data.data);
      }else{
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    loadData();
  }, [])

  return (
    <div className='container'>
      <div className='bg-success p-5'>
        <h2 className='text-white text-center'>Dashboard</h2>
      </div>
      <div className='mt-5 p-3'>
        <button className='btn mt-3 btn-danger float-end' onClick={Logout}>Logout</button>
        <br />

        <h2 className='mt-5'>{user?.user}</h2>
        <h2>{user?.email}</h2>
      </div>

      <div className='mt-4'>
        <div className='col-md-5 mx-auto mt-3 p-5'>
          <div className='card p-3 bg-white'>

            <h2 className='pt-2 px-4'>Update Details</h2>
            <form className='mt-5 mx-4' onSubmit={handleSubmit(updateSubmit)}>
              <div className='form-group'>
                <h5>Name</h5>
                <input type="text" value={user?.user} className='form-control' readOnly />
              </div>
              <div className='form-group mt-4'>
                <h5>Email</h5>
                <input type="text" value={user?.email} className='form-control' readOnly />
              </div>
              <div className='form-group mt-4'>
                <h5>Current Password</h5>
                <input type='password' className='form-control'
                  {
                  ...register
                    (
                      "cupassword",
                      {
                        required: true,
                        pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
                      }
                    )
                  }
                  placeholder='Enter current password'
                />
                {errors.cupassword &&
                  <div>
                    <p className='text-danger'> Password should be of length 6-15</p>
                    <p className='text-danger'>Should cotain at least on uppercase, lowercase, numbeer and special character</p>
                  </div>
                }
              </div>
              <div className='form-group mt-4'>
                <h5>New Password</h5>
                <input type='password' className='form-control'
                  {
                  ...register
                    (
                      "password",
                      {
                        required: true,
                        pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
                      }
                    )
                  }
                  placeholder='Enter new password' />
                {errors.password &&
                  <div>
                    <p className='text-danger'> Password should be of length 6-15</p>
                    <p className='text-danger'>Should cotain at least on uppercase, lowercase, numbeer and special character</p>
                  </div>
                }
              </div>
              <div className='form-group mt-4'>
                <h5>Confirm new Password</h5>
                <input type='password' className='form-control'
                  {
                  ...register
                    (
                      "cpassword",
                      {
                        required: true,
                        pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
                      }
                    )
                  }
                  placeholder='Enter confirm new password' />
                {errors.cpassword &&
                  <div>
                    <p className='text-danger'> Password should be of length 6-15</p>
                    <p className='text-danger'>Should cotain at least on uppercase, lowercase, numbeer and special character</p>
                  </div>
                }
              </div>
              <div className='text-center'>
                <button type='submit' className='submit-btn mt-5'>Submit</button>
              </div>
            </form>

          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Dashboard