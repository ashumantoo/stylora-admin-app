import { Button, Input, Select, message, Image, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { UploadMedia } from '../../components/upload-media';
import { ISimpleCategory, MEDIA_FOLDER_NAME } from '../../types/category-types';
import { IProductInput, ProductStatus } from '../../types/product-types';
import { useDispatch, useSelector } from 'react-redux';
import { formatAxiosError } from '../../utils/helper';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { _createProduct, _getProduct, _updateProduct } from '../../slices/product-slice';
import { DeleteOutlined } from '@ant-design/icons';

const productDefaultValues: IProductInput = {
  name: "",
  description: "",
  sellingPrice: 0,
  maxRetailPrice: 0,
  quantity: 0,
  productImages: [],
  category: "",
  status: ProductStatus.ACTIVE
}

export const ProductMutation = () => {
  const { allCategories } = useSelector((state: any) => state.categoryReducer);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [messageApi, contextHolder] = message.useMessage();
  const [categories, setCategories] = useState([]);

  const { control, handleSubmit, reset, setValue, getValues, watch, formState: { errors } } = useForm({
    defaultValues: {
      ...productDefaultValues
    },
  });

  const _productImages = watch('productImages');
  const fetchProduct = async (productId: string) => {
    try {
      const response = await dispatch(_getProduct(productId)).unwrap();
      if (response) {
        reset({
          ...response.product
        })
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: formatAxiosError(error as AxiosError),
      });
    }
  }

  const onSubmit: SubmitHandler<IProductInput> = async (data) => {
    try {
      if (params.productId) {
        const response = await dispatch(_updateProduct({
          productId: params.productId,
          product: {
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
        const response = await dispatch(_createProduct({
          ...data,
          sellingPrice: typeof data.sellingPrice === 'string' ? parseInt(data.sellingPrice) : data.sellingPrice,
          maxRetailPrice: typeof data.maxRetailPrice === 'string' ? parseInt(data.maxRetailPrice) : data.maxRetailPrice
        })).unwrap();
        if (response) {
          navigate('/products');
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
    if (params.productId) {
      fetchProduct(params.productId);
    }
  }, [params.productId]);

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
      <h3 className='text-2xl font-bold'>Add Product</h3>

      <div className='bg-white mt-4 p-4'>
        <div>
          <p className='text-base font-normal'>Product Name*</p>
          <Controller
            name="name"
            control={control}
            rules={{
              required: true
            }}
            render={({ field }) => (
              <Input
                {...field}
                className='mt-2'
                placeholder='Enter Name'
                value={field.value}
              />
            )}
          />
          <p className='mt-4'>Product Description</p>
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
              <p className='mt-4'>Selling Price</p>
              <Controller
                name="sellingPrice"
                control={control}
                rules={{
                  required: true
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    required={true}
                    className='mt-2'
                    placeholder='Enter Selling Price'
                    value={field.value}
                  />
                )}
              />
            </div>
            <div className='w-full'>
              <p className='mt-4'>Max Retail Price</p>
              <Controller
                name="maxRetailPrice"
                control={control}
                rules={{
                  required: true
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    required={true}
                    className='mt-2'
                    placeholder='Enter max retail price'
                    value={field.value}
                  />
                )}
              />
            </div>
          </div>
          <div className='flex gap-2'>
            <div className='w-full'>
              <p className='mt-4'>Quantity</p>
              <Controller
                name="quantity"
                control={control}
                rules={{
                  required: true
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    required={true}
                    className='mt-2'
                    placeholder='Enter Quantity'
                    value={field.value}
                  />
                )}
              />
            </div>
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
          </div>
          <Row gutter={16} className='mt-4'>
            {_productImages.map((pi) => {
              return (
                <Col className="gutter-row flex flex-col" span={5} key={pi}>
                  <div>
                    <Image
                      width={120}
                      height={120}
                      src={pi}
                      preview={false}
                      className='mt-4 border rounded-lg'
                    />
                  </div>
                  <div
                    className='mt-6 ml-16 cursor-pointer'
                    onClick={() => {
                      const filteredImages = _productImages.filter((url: string) => url !== pi);
                      setValue('productImages', [...filteredImages]);
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
            <UploadMedia
              folderName={MEDIA_FOLDER_NAME.PRODUCTS}
              getUploadedMediaUrls={(urls: string[]) => {
                setValue('productImages', [...getValues('productImages'), ...urls]);
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

