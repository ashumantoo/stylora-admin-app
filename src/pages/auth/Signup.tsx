import React, { FC, useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Button, Col, Input, Row, message } from 'antd';
import { Fa500Px } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { adminSignUp } from '../../slices/auth-slice';

interface IProps {
}

export const Signup: FC<IProps> = ({ }) => {
  const navigate = useNavigate();
  const { user, authenticated, errorMsg } = useSelector((store: any) => store.authReducer);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      firstName: '',
      lastName: "",
      email: "",
      mobile: "",
      password: "",
    }
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await dispatch(adminSignUp(data)).unwrap();
      messageApi.open({
        type: 'success',
        content: 'Admin user created successfully',
      });
      reset({
        firstName: '',
        lastName: "",
        email: "",
        mobile: "",
        password: "",
      });
      navigate('/signin');
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error as string,
      });
    }
  };

  return (
    <div className='h-screen flex'>
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
              <Col span={12} className='mt-4'>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) =>
                    <Input
                      {...field}
                      placeholder="First Name"
                    />
                  }
                />
              </Col>
              <Col span={12} className='mt-4'>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) =>
                    <Input
                      {...field}
                      placeholder="Last Name"
                    />
                  }
                />
              </Col>
              <Col span={24}>
                <Controller
                  name="email"
                  control={control}
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
                  name="mobile"
                  control={control}
                  render={({ field }) =>
                    <Input
                      {...field}
                      placeholder="Mobile"
                    />
                  }
                />
              </Col>
              <Col span={24}>
                <Controller
                  name="password"
                  control={control}
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
                <h3 className='text-center'>Have you already registered, <span className='text-cyan-600 underline cursor-pointer' onClick={() => { navigate('/signin') }}>Log In</span> </h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}