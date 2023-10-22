import React, { useState } from 'react'
import { Signin } from './Signin';
import { Signup } from './Signup';
import { Outlet } from 'react-router-dom';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleLoginClick = () => {
    setIsLogin(true);
  }

  const handleSignupClick = () => {
    setIsLogin(false);
  }

  return (
    <div className='h-screen flex overflow-hidden'>
      <div className='shadow-md flex-1'>
        <img
          src="https://images.pexels.com/photos/3127880/pexels-photo-3127880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          style={{ maxHeight: "100%", width: "100%" }}
          alt="" />
      </div>
      <div className='flex-1'>
       
      </div>
    </div>
  )
}