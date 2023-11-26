import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Button, Col, Input, Row, message } from 'antd';
import { Fa500Px } from "react-icons/fa";
import { adminSignIn, setAuthState } from '../../slices/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';

interface IProps {
}

export const Signin: FC<IProps> = ({ }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: any) => {
    try {
      await dispatch(adminSignIn({
        ...data
      })).unwrap();
      navigate('/dashboard');
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  };

  return (
    <div className='h-screen flex overflow-hidden'>
      {contextHolder}
      <div className='shadow-md flex-1'>
        <img
          src="https://images.pexels.com/photos/3127880/pexels-photo-3127880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          style={{ maxHeight: "100%", width: "100%" }}
          alt="" />
      </div>
      <div className='flex-1'>
        <Row gutter={[16, 16]} className='flex justify-center items-center mt-28'>
          <Col span={12}>
            <Row gutter={[16, 16]} className="p-4">
              <Col span={24}>
                <Fa500Px size={36} className='text-cyan-600' />
              </Col>
              <Col span={24}>
                <h2 className='text-2xl font-bold'>Hey, Hello 👋</h2>
                <h3>Enter the information to register</h3>
              </Col>
              <Col span={24} className='mt-4'>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) =>
                    <Input
                      {...field}
                      placeholder="Email"
                    />
                  }
                />
              </Col>
              <Col span={24}>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field }) =>
                    <Input
                      {...field}
                      type='password'
                      placeholder="Password"
                    />
                  }
                />
              </Col>
              <Col span={24}>
                <Button
                  title='Submit'
                  type='primary'
                  size='middle'
                  className='w-full bg-cyan-600'
                  onClick={handleSubmit(onSubmit)}>
                  {"Submit"}
                </Button>
              </Col>
              <Col span={24}>
                <h3 className='text-center'>Have not registered yet, <span className='text-cyan-600 underline cursor-pointer' onClick={() => { navigate('/signup') }}>Sign Up</span> </h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}