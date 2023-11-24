import { ThunkDispatch } from '@reduxjs/toolkit';
import { Button, message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IOrder, IOrderTable } from '../../types/order-types';
import Table, { ColumnsType } from 'antd/es/table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { _getOrders } from '../../slices/order-slice';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';

export const Orders = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<IOrderTable[]>([]);

  const columns: ColumnsType<IOrderTable> = [
    {
      title: "Order Number",
      dataIndex: "referenceNumber"
    },
    {
      title: "Customer",
      dataIndex: "customerName"
    },
    {
      title: "Items",
      dataIndex: "totalItems"
    },
    {
      title: "Status",
      dataIndex: "status"
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus"
    },
    {
      title: "Amount",
      dataIndex: "totalAmount"
    },
    {
      title: "Actions",
      render: (value: any, record: IOrderTable, index: number) => {
        return (
          <div className='flex justify-around items-center'>
            <span>
              <FaEdit
                size={18}
                className='text-blue-700 opacity-70 cursor-pointer hover:scale-110'
                onClick={() => {
                  navigate(`/orders/${record._id}`)
                }}
              />
            </span>
            <span>
            </span>
          </div>
        )
      }
    }
  ];

  const fetchOrders = useCallback(async () => {
    try {
      const response = await dispatch(_getOrders()).unwrap();
      if (response && response.orders) {
        const formatedOrders: IOrderTable[] = response.orders.map((order: IOrder) => {
          return {
            _id: order._id,
            referenceNumber: order.referenceNumber,
            customerName: `${order.user.firstName} ${order.user.lastName}`,
            totalItems: order.items.length,
            status: order.orderStatus[0].status,
            paymentStatus: order.paymentStatus,
            totalAmount: order.totalAmount,
          }
        });
        setData(formatedOrders);
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }, [dispatch, messageApi]);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className='px-16 py-8 bg-gray-100'>
      {contextHolder}
      <div className='flex justify-between py-2 align-middle'>
        <h3 className='text-2xl font-bold'>Orders</h3>
      </div>

      <div className='bg-white mt-4 p-4'>
        <Table
          rowSelection={{
            type: 'checkbox'
          }}
          columns={columns}
          dataSource={data}
          size='middle'
        />
      </div>
    </div>
  )
}