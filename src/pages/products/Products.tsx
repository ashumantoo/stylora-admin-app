import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, CheckOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space, Table, message } from 'antd'
import { IProduct } from '../../types/product-types';
import { ColumnsType } from 'antd/es/table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { _deleteProduct, _getProducts } from '../../slices/product-slice';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '../../components/comfirmation-modal';

enum VIEWENUM {
  LIST = "LIST",
  CARD = "CARD"
}

export const Products = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const [data, setData] = useState<Partial<IProduct>[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [view, setView] = useState(VIEWENUM.LIST);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");

  const columns: ColumnsType<Partial<IProduct>> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Selling Price',
      dataIndex: 'sellingPrice',
    },
    {
      title: 'Retail Price',
      dataIndex: 'maxRetailPrice',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: "Actions",
      render: (value: any, record: Partial<IProduct>, index: number) => {
        return (
          <div className='flex justify-around items-center'>
            <span>
              <FaEdit
                size={18}
                className='text-blue-700 opacity-70 cursor-pointer hover:scale-110'
                onClick={() => {
                  navigate(`/products/${record._id}`)
                }}
              />
            </span>
            <span>
              <FaTrash
                size={18}
                className='text-red-500 opacity-70 cursor-pointer hover:scale-110'
                onClick={() => {
                  setOpenDeleteModal(true);
                  if (record && record._id) {
                    setSelectedProductId(record._id);
                  }
                }}
              />
            </span>
          </div>
        )
      }
    }
  ];

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <p className={view === VIEWENUM.LIST ? 'text-blue-600' : ""} onClick={() => setView(VIEWENUM.LIST)}>
          <UnorderedListOutlined color='primary' />
          <span className='ml-2'>
            List
          </span>
          {view === VIEWENUM.LIST && <span className='ml-6'><CheckOutlined /></span>}
        </p>
      ),
    },
    {
      key: '2',
      label: (
        <p className={view === VIEWENUM.CARD ? 'text-blue-600' : ""} onClick={() => setView(VIEWENUM.CARD)}>
          <AppstoreOutlined />
          <span className='ml-2'>
            Card
          </span>
          {view === VIEWENUM.CARD && <span className='ml-6'><CheckOutlined /></span>}
        </p>
      )
    },
  ];

  const fetchProducts = async () => {
    try {
      const response = await dispatch(_getProducts()).unwrap();
      if (response && response.products) {
        const formatedProducts = response.products.map((product: IProduct) => {
          return {
            _id: product._id,
            name: product.name,
            sellingPrice: `₹${product.sellingPrice.toLocaleString()}`,
            maxRetailPrice: `₹${product.maxRetailPrice.toLocaleString()}`,
            quantity: product.quantity,
            category: typeof product.category === 'object' ? product.category.name : "",
            status: product.status
          }
        })
        setData(formatedProducts);
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }

  const deleteProduct = async (productId: string) => {
    try {
      const response = await dispatch(_deleteProduct(productId)).unwrap();
      if (response && response) {
        fetchProducts();
        setOpenDeleteModal(false);
        setSelectedProductId("");
        messageApi.open({
          type: 'success',
          content: "Deleted successfully",
        });
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error as string,
      });
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <div className='px-16 py-8 bg-gray-100'>
      {contextHolder}
      <div className='flex justify-between py-2 align-middle'>
        <h3 className='text-2xl font-bold'>Products</h3>
        <div>
          <Dropdown menu={{ items }} className='mr-4 bg-blue-500 text-white py-2 rounded-md'>
            <a onClick={(e) => e.preventDefault()}>
              <Space className='p-3'>
                Switch View
                {view === VIEWENUM.LIST ? <UnorderedListOutlined /> : <AppstoreOutlined />}
              </Space>
            </a>
          </Dropdown>
          <Button
            type='primary'
            onClick={() => {
              navigate('/products/new');
            }}
          >
            + New Product
          </Button>
        </div>
      </div>

      <div className='bg-white mt-4 p-4'>
        {view === VIEWENUM.LIST ? (
          <Table
            rowSelection={{
              type: 'checkbox'
            }}
            columns={columns}
            dataSource={data}
            size='middle'
          />
        ) : (
          <h3>Not implemented yet</h3>
        )}
      </div>
      {openDeleteModal && (
        <ConfirmationModal
          open={openDeleteModal}
          title='Delete product'
          description='Are you sure, you want to delete this product'
          handleClose={() => setOpenDeleteModal(false)}
          handleSubmit={() => { deleteProduct(selectedProductId) }}
          okText='Delete'
          delete={true}
        />
      )}
    </div>
  )
}