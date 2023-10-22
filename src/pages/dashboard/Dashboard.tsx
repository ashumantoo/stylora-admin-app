import React from 'react'
import { useSelector } from 'react-redux';

export const Dashboard = () => {
  const { user, token, authenticated } = useSelector((store: any) => store.authReducer);
  return (
    <div className='px-24 py-8 bg-gray-100'>

    </div>
  )
}