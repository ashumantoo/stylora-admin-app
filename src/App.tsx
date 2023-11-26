import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { setAuthState } from './slices/auth-slice';
import AppRoute from './app.route';
import { ConfigProvider, message } from 'antd';
import { _getCategories, setAllCategories } from './slices/category-slice';
import { _formatedCategories, formatAxiosError, formatCategories } from './utils/helper';
import { AxiosError } from 'axios';


function App() {
  const { authenticated } = useSelector((state: any) => state.authReducer);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await dispatch(_getCategories()).unwrap();
        if (response && response.categories) {
          formatCategories(response.categories);
          dispatch(setAllCategories(_formatedCategories));
        }
      } catch (error) {
        messageApi.open({
          type: 'error',
          content: formatAxiosError(error as AxiosError),
        });
      }
    }
    fetchCategories();
  }, [dispatch, messageApi]);

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
      {contextHolder}
      <AppRoute />
    </ConfigProvider>
  );
}

export default App;
