import { Button, Input, Select, message, Image, Row, Col } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { UploadMedia } from '../../components/upload-media';
import { ISimpleCategory, MEDIA_FOLDER_NAME } from '../../types/category-types';
import { useDispatch, useSelector } from 'react-redux';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { DeleteOutlined } from '@ant-design/icons';
import { ICategoryPageInput, IPageContent } from '../../types/category-page-types';
import { _createCategoryPage, _getCategoryPage, _updateCategoryPage } from '../../slices/category-page-slice';

const categoryPageDefaultValues: ICategoryPageInput = {
  title: "",
  description: "",
  category: "",
  banners: [],
  products: []
}

export const CategoryPageMutation = () => {
  const { allCategories } = useSelector((state: any) => state.categoryReducer);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();
  const [categories, setCategories] = useState([]);

  const { control, handleSubmit, reset, setValue, getValues, watch } = useForm({
    defaultValues: {
      ...categoryPageDefaultValues
    },
  });

  const _bannersImages = watch('banners');
  const _productsImages = watch('products');

  const fetchCategoryPage = useCallback(async (pageId: string) => {
    try {
      const response = await dispatch(_getCategoryPage(pageId)).unwrap();
      if (response) {
        reset({
          ...response.categoryPage
        })
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }, [dispatch, messageApi, reset]);

  const onSubmit: SubmitHandler<ICategoryPageInput> = async (data) => {
    try {
      if (params.pageId) {
        const response = await dispatch(_updateCategoryPage({
          pageId: params.pageId,
          categoryPage: {
            ...data
          }
        })).unwrap();
        if (response) {
          messageApi.open({
            type: 'success',
            content: "Updated successfully",
          });
        }
      } else {
        const response = await dispatch(_createCategoryPage({
          ...data
        })).unwrap();
        if (response) {
          navigate('/category-page');
          messageApi.open({
            type: 'success',
            content: "Product added successfully",
          });
        }
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }

  useEffect(() => {
    if (params.pageId) {
      fetchCategoryPage(params.pageId);
    }
  }, [params.pageId, fetchCategoryPage]);

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

  return (
    <div className='px-80 py-8 bg-gray-100'>
      {contextHolder}
      <h3 className='text-2xl font-bold'>Add Page</h3>

      <div className='bg-white mt-4 p-4'>
        <div>
          <p className='text-base font-normal'>Page Title*</p>
          <Controller
            name="title"
            control={control}
            rules={{
              required: true
            }}
            render={({ field }) => (
              <Input
                {...field}
                className='mt-2'
                placeholder='Enter Title'
                value={field.value}
              />
            )}
          />
          <p className='mt-4'>Page Description</p>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                rows={4}
                className='mt-2'
                placeholder='Enter Description'
                value={field.value}
              />
            )}
          />
          <div className='flex gap-2'>
            <div className='w-full'>
              <p className='mt-4'>Select Category</p>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    className='w-full mt-2'
                    placeholder="Select Category"
                    options={categories}
                    value={field.value}
                  />
                )}
              />
            </div>
            <div className='w-full'>
            </div>
          </div>
          <Row gutter={16} className='mt-4'>
            {_bannersImages && _bannersImages.length > 0 && _bannersImages.map((pi) => {
              return (
                <Col className="gutter-row flex flex-col" span={5} key={pi.imgUrl}>
                  <div className='block'>
                    <Image
                      width={140}
                      height={100}
                      src={pi.imgUrl}
                      preview={false}
                      className='mt-4 border rounded-lg'
                    />
                  </div>
                  <div
                    className='mt-6 ml-16 cursor-pointer'
                    onClick={() => {
                      const filteredImages = _bannersImages.filter((_pi) => _pi.imgUrl !== pi.imgUrl);
                      setValue('banners', [...filteredImages]);
                    }}
                  >
                    <DeleteOutlined
                      style={{ color: "red" }}
                    />
                  </div>
                </Col>
              )
            })}
          </Row>
          <div className='mt-6'>
            <p className='mb-2'>Upload banners images</p>
            <UploadMedia
              folderName={MEDIA_FOLDER_NAME.CATEGORIES_PAGE}
              getUploadedMediaUrls={(urls: string[]) => {
                const formatBannersImages: IPageContent[] = urls.map((url: string) => {
                  return {
                    imgUrl: url,
                    navigateTo: ""
                  }
                })
                setValue('banners', [...getValues('banners'), ...formatBannersImages]);
              }}
            />
          </div>
          <Row gutter={16} className='mt-4'>
            {_productsImages && _productsImages.length > 0 && _productsImages.map((pi) => {
              return (
                <Col className="gutter-row flex flex-col" span={5} key={pi.imgUrl}>
                  <div>
                    <Image
                      width={120}
                      height={140}
                      src={pi.imgUrl}
                      preview={false}
                      className='mt-4 border rounded-lg'
                    />
                  </div>
                  <div
                    className='mt-6 ml-16 cursor-pointer'
                    onClick={() => {
                      const filteredImages = _productsImages.filter((_pi) => _pi.imgUrl !== pi.imgUrl);
                      setValue('products', [...filteredImages]);
                    }}
                  >
                    <DeleteOutlined
                      style={{ color: "red" }}
                    />
                  </div>
                </Col>
              )
            })}
          </Row>
          <div className='mt-6'>
            <p className='mb-2'>Upload product images</p>
            <UploadMedia
              folderName={MEDIA_FOLDER_NAME.CATEGORIES_PAGE}
              getUploadedMediaUrls={(urls: string[]) => {
                const formatProductImages: IPageContent[] = urls.map((url: string) => {
                  return {
                    imgUrl: url,
                    navigateTo: ""
                  }
                })
                setValue('products', [...getValues('products'), ...formatProductImages]);
              }}
            />
          </div>
          <div className='flex justify-end items-center'>
            <Button
              type='primary'
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

