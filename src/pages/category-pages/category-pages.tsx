import { ThunkDispatch } from '@reduxjs/toolkit';
import { Button, message } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { FC, useCallback, useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { ConfirmationModal } from '../../components/comfirmation-modal';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { ICategoryPage, ICategoryPageTableColumn } from '../../types/category-page-types';
import { _deleteCategoryPage, _getCategoriesPage } from '../../slices/category-page-slice';

export const CategoryPages: FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<ICategoryPageTableColumn[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategoryPageId, setSelectedCategoryPageId] = useState("");

  const columns: ColumnsType<ICategoryPageTableColumn> = [
    {
      title: "Tilte",
      dataIndex: "title"
    },
    {
      title: "Category",
      dataIndex: "category"
    },
    {
      title: "Product Images",
      dataIndex: "productImages"
    },
    {
      title: "Banner Images",
      dataIndex: "bannerImages"
    },
    {
      title: "Created By",
      dataIndex: "createdBy"
    },
    {
      title: "Actions",
      render: (value: any, record: ICategoryPageTableColumn, index: number) => {
        return (
          <div className='flex justify-around items-center'>
            <span>
              <FaEdit
                size={18}
                className='text-blue-700 opacity-70 cursor-pointer hover:scale-110'
                onClick={() => {
                  navigate(`/category-page/${record._id}`)
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
                    setSelectedCategoryPageId(record._id);
                  }
                }}
              />
            </span>
          </div>
        )
      }
    }
  ];

  const fetchCategoriesPage = useCallback(async () => {
    try {
      const response = await dispatch(_getCategoriesPage()).unwrap();
      if (response && response.categoriesPage) {
        const formatedCategoriesPage: ICategoryPageTableColumn[] = response.categoriesPage.map((cpage: ICategoryPage) => {
          return {
            _id: cpage._id,
            title: cpage.title,
            category: typeof cpage.category === 'object' ? cpage.category.name : "",
            bannerImages: cpage.banners && cpage.banners.length ? cpage.banners.length : 0,
            productImages: cpage.products && cpage.products.length ? cpage.products.length : 0,
            createdBy: typeof cpage.createdBy === 'object' ? `${cpage.createdBy.firstName} ${cpage.createdBy.lastName}` : ""
          }
        });
        setData(formatedCategoriesPage);
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }, [dispatch, messageApi,]);

  const deleteCategoryPage = async (pageId: string) => {
    try {
      const response = await dispatch(_deleteCategoryPage(pageId)).unwrap();
      if (response && response) {
        fetchCategoriesPage();
        setOpenDeleteModal(false);
        setSelectedCategoryPageId("");
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
    fetchCategoriesPage();
  }, [fetchCategoriesPage]);

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

      {openDeleteModal && (
        <ConfirmationModal
          open={openDeleteModal}
          title='Delete page'
          description='Are you sure, you want to delete this page'
          handleClose={() => setOpenDeleteModal(false)}
          handleSubmit={() => { deleteCategoryPage(selectedCategoryPageId) }}
          okText='Delete'
          delete={true}
        />
      )}
    </div>
  )
}