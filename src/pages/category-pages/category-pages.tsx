import { ThunkDispatch } from '@reduxjs/toolkit';
import { Button, message, Image } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { FC, useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { _deleteCategory, _getCategories, setAllCategories } from '../../slices/category-slice';
import { ICategory } from '../../types/category-types';
import { CategoryMutationModal } from '../category/category-mutation-modal';
import { ConfirmationModal } from '../../components/comfirmation-modal';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const CategoryPages: FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const columns: any = [];

  return (
    <div className='px-16 py-8 bg-gray-100'>
      {contextHolder}
      <div className='flex justify-between py-2 align-middle'>
        <h3 className='text-2xl font-bold'>Pages</h3>
        <Button
          type='primary'
          onClick={() => navigate('/category-page/new')}
        >
          + New Page
        </Button>
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