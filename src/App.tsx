import './App.css';
import { AppLayout } from './components/layout/Layout';
import { useEffect, useState } from 'react';
import { Auth } from './pages/auth'
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { setAuthState } from './slices/auth-slice';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import AppRoute from './app.route';
import { Signin } from './pages/auth/Signin';


function App() {
  const { authenticated } = useSelector((state: any) => state.authReducer);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    if (!authenticated) {
      dispatch(setAuthState())
    }
  }, [authenticated]);
  
  return (
    <>
      <AppRoute />
    </>
  );
}

export default App;
