import { ThunkDispatch } from '@reduxjs/toolkit';
import { Button, message, Image } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { _deleteCategory, _getCategories, setAllCategories } from '../../slices/category-slice';
import { ICategory } from '../../types/category.types';
import { CategoryMutationModal } from './category-mutation-modal';
import { ConfirmationModal } from '../../components/comfirmation-modal';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';

interface ICategoryData {
  _id: string;
  imageUrl: string;
  name: string;
  slug: string;
  parent: string;
  parentId: string;
}

export const Categories = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<ICategoryData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const _formatedCategories: ICategoryData[] = [];

  const columns: ColumnsType<ICategoryData> = [
    {
      title: 'Image',
      render: (value: ICategoryData, record: ICategoryData, index: number) => {
        return (
          <>
            <Image
              width={50}
              height={50}
              src={record.imageUrl}
            />
          </>
        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
    },
    {
      title: 'Parent Category',
      dataIndex: 'parent',
    },
    {
      title: "Actions",
      render: (value: any, record: ICategoryData, index: number) => {
        return (
          <div className='flex justify-around items-center'>
            <span>
              <FaEdit
                size={18}
                className='text-blue-700 opacity-70 cursor-pointer hover:scale-110'
                onClick={() => {
                  setOpenModal(true);
                  setSelectedCategoryId(record._id);
                }}
              />
            </span>
            <span>
              <FaTrash
                size={18}
                className='text-red-500 opacity-70 cursor-pointer hover:scale-110'
                onClick={() => {
                  setOpenDeleteModal(true);
                  setSelectedCategoryId(record._id);
                }}
              />
            </span>
          </div>
        )
      }
    }
  ];

  const fetchCategories = async () => {
    try {
      const response = await dispatch(_getCategories()).unwrap();
      if (response && response.categories) {
        formatCategories(response.categories);
        dispatch(setAllCategories(_formatedCategories));
        setData(_formatedCategories);
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }

  const deleteCategory = async (categoryId: string) => {
    try {
      const response = await dispatch(_deleteCategory(categoryId)).unwrap();
      if (response && response) {
        fetchCategories();
        setOpenDeleteModal(false);
        setSelectedCategoryId("");
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
    fetchCategories();
  }, []);

  const formatCategories = (categories: ICategory[], parentId?: string, name?: string) => {
    for (let index = 0; index < categories.length; index++) {
      const category = categories[index];
      _formatedCategories.push({
        _id: category._id,
        name: category.name,
        parent: name || "",
        parentId: parentId || "",
        imageUrl: category.imageUrl ? category.imageUrl : `https://placehold.co/600x400`,
        slug: category.slug
      })
      if (category.subCategories && category.subCategories.length) {
        formatCategories(category.subCategories, category.parentId, category.name);
      }
    }
  }

  return (
    <div className='px-16 py-8 bg-gray-100'>
      {contextHolder}
      <div className='flex justify-between py-2 align-middle'>
        <h3 className='text-2xl font-bold'>Categories</h3>
        <Button
          type='primary'
          onClick={() => setOpenModal(true)}
        >
          + New Category
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
          pagination={{
            position: ["bottomCenter"],
            pageSizeOptions: [10, 20, 50, 100],
            showSizeChanger: true,
            defaultPageSize: 10
          }}
        />
        {openModal && (
          <CategoryMutationModal
            categoryId={selectedCategoryId}
            open={openModal}
            handleClose={() => setOpenModal(false)}
            reloadCategory={() => fetchCategories()}
          />
        )}
        {openDeleteModal && (
          <ConfirmationModal
            open={openDeleteModal}
            handleClose={() => setOpenDeleteModal(false)}
            handleSubmit={() => deleteCategory(selectedCategoryId)}
            title='Delete Category'
            description='Are you sure, you want to delete this category'
            okText='Delete'
            delete={true}
          />
        )}
      </div>
    </div>
  )
}