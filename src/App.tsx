import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { setAuthState } from './slices/auth-slice';
import AppRoute from './app.route';
import { ConfigProvider } from 'antd';


function App() {
  const { authenticated } = useSelector((state: any) => state.authReducer);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    if (!authenticated) {
      dispatch(setAuthState())
    }
  }, [authenticated]);

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#2874f0'
      },
      components: {
        Button: {
          colorPrimary: '#2874f0'
        }
      }
    }
    }>
      <AppRoute />
    </ConfigProvider>
  );
}

export default App;
