import React, { FC, useEffect, useState } from 'react';
import { Button, Input, Modal, Select, Space, Upload, message } from 'antd';
import { ICategory, ICategoryInput, ISimpleCategory } from '../../types/category.types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { _createCategory, _getCategory, _updateCategory } from '../../slices/category-slice';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';

interface IProps {
  open: boolean;
  categoryId?: string;
  handleClose: () => void;
  reloadCategory: () => void;
}

const defaultCategory = {
  name: "",
  parentId: ""
}

export const CategoryMutationModal: FC<IProps> = ({ open, categoryId, handleClose, reloadCategory }) => {
  const { allCategories } = useSelector((state: any) => state.categoryReducer);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [categories, setCategories] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      ...defaultCategory
    },
  })

  const onSubmit: SubmitHandler<ICategoryInput> = async (data) => {
    try {
      if (categoryId) {
        const response = await dispatch(_updateCategory({
          categoryId,
          category: {
            ...data
          }
        })).unwrap();
        if (response) {
          handleClose();
          reloadCategory();
        }
      } else {
        const response = await dispatch(_createCategory({
          ...data
        })).unwrap();
        if (response) {
          handleClose();
          reloadCategory();
        }
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }

  const fetchCategory = async (categoryId: string) => {
    try {
      const response = await dispatch(_getCategory(categoryId)).unwrap();
      if (response) {
        reset({
          name: response.category.name,
          parentId: response.category.parentId
        })
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }

  useEffect(() => {
    if (allCategories && allCategories.length) {
      const mappedCategories = allCategories.map((c: ISimpleCategory) => {
        return {
          value: c._id,
          label: c.name
        }
      })
      setCategories(mappedCategories);
    }
  }, [allCategories]);

  useEffect(() => {
    if (categoryId) {
      fetchCategory(categoryId);
    }
  }, [categoryId]);

  return (
    <div className=''>
      {contextHolder}
      <Modal
        title={`${categoryId ? 'Update Category' : 'Add New Category'}`}
        open={open}
        centered
        footer={null}
      >
        <div>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder='Enter Category Name'
                value={field.value}
              />
            )}
          />
          <Controller
            name="parentId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className='w-full mt-4'
                placeholder="Select Parent Category"
                options={categories}
                value={field.value}
              />
            )}
          />
          <div className='mt-4'>
            <Upload
              accept='image/*'
              onChange={() => { }}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </div>
          <div className='flex justify-end items-center gap-1'>
            <Button onClick={handleClose}>
              Cancel
            </Button>
            <Button
              className='bg-blue-700 text-white'
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}