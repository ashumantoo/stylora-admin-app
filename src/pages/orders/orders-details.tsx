import './orders-details.css';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Col, Divider, Row, Spin, message } from 'antd';
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { _getOrder, _updateOrderStatus } from '../../slices/order-slice';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';
import { IAppState } from '../../store';

export const OrderDetails: FC = () => {
  const params = useParams();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();
  const { order } = useSelector((state: IAppState) => state.orderReducer);
  const [fetching, setFetching] = useState(false);
  const [newOrderStatus, setNewOrderStatus] = useState("");

  const formatDate = (date: any) => {
    if (date) {
      const d = new Date(date);
      return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
    }
    return "";
  };

  const fetchOrder = useCallback(async (orderId: string) => {
    try {
      await dispatch(_getOrder(orderId)).unwrap();
      setFetching(false);
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
      setFetching(false);
    }
  }, [dispatch, messageApi]);


  const updateOrderStatus = useCallback(async (orderId: string) => {
    try {
      if (orderId && newOrderStatus) {
        const response = await dispatch(_updateOrderStatus({
          orderId,
          payload: {
            status: newOrderStatus
          }
        })).unwrap();
        if (response) {
          fetchOrder(orderId);
        }
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }, [dispatch, messageApi, newOrderStatus]);

  useEffect(() => {
    if (params && params.orderId) {
      setFetching(true);
      fetchOrder(params.orderId);
    }
  }, [params]);

  return (
    <div className='px-16 py-8 bg-gray-100'>
      {contextHolder}
      <div className='flex justify-between py-2 align-middle'>
        <h3 className='text-2xl font-bold'>Order Details</h3>
      </div>

      <div className='bg-white mt-4 p-4'>
        {fetching ? (
          <Spin />
        ) : (
          <div>
            <p className='mt-4'>Order Number: <span className='font-bold'>{order.referenceNumber}</span></p>
            <Divider />
            <div className='p-4 pl-8'>
              <Row gutter={16}>
                <Col className="gutter-row" span={12}>
                  <div className='text-lg font-bold'>Items</div>
                  {order.items.map((item, index) => (
                    <div key={index} className='py-2'>
                      {`${index + 1}. ${item.product.name}`}
                    </div>
                  ))}
                </Col>
                <Col className="gutter-row" span={4}>
                  <div className='text-lg font-bold'>Total Price</div>
                  <div className='py-2'>{order.totalAmount}</div>
                </Col>
                <Col className="gutter-row" span={4}>
                  <div className='text-lg font-bold'>Payment Type</div>
                  <div className='py-2'>{order.paymentType}</div>
                </Col>
                <Col className="gutter-row" span={4}>
                  <div className='text-lg font-bold'>Payment Status</div>
                  <div className='py-2'>{order.paymentStatus}</div>
                </Col>
              </Row>
              <div className='mt-36 p-8 mb-8 flex box-border items-center'>
                <div className='orderTrack'>
                  {order.orderStatus.map((os, index) => {
                    return (
                      <div
                        key={index}
                        className={`orderStatus ${os.isCompleted ? "active" : ""}`}
                      >
                        <div
                          className={`point ${os.isCompleted ? "active" : ""}`}
                        ></div>
                        <div className="orderInfo">
                          <div className="status">{os.status}</div>
                          <div className="date">{formatDate(os.date)}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                {/* select input to apply order action */}
                <div
                  style={{
                    padding: "0 50px",
                    boxSizing: "border-box",
                    marginLeft: 50
                  }}
                >
                  <select onChange={(e) => {
                    setNewOrderStatus(e.target.value)
                  }}
                    className='p-2 rounded-md'
                  >
                    <option value={""}>select status</option>
                    {order.orderStatus.map((os) => {
                      return (
                        <>
                          {!os.isCompleted ? (
                            <option key={os.status} value={os.status}>
                              {os.status}
                            </option>
                          ) : null}
                        </>
                      );
                    })}
                  </select>
                </div>
                {/* button to confirm action */}

                <div
                  style={{
                    padding: "0 50px",
                    boxSizing: "border-box",
                  }}
                >
                  <button className='bg-blue-500 text-white px-8 py-2 rounded-md' onClick={() => updateOrderStatus(order._id)}>
                    confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}