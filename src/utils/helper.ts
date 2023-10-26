import axios, { AxiosError } from "axios"
import { ICategory, ICategoryData } from "../types/category-types";

export const _formatedCategories: ICategoryData[] = [];

export const formatAxiosError = (error: AxiosError) => {
  let errorMsg = "";
  if (error.response?.data) {
    const responseData: any = error.response.data;
    if (responseData.message) {
      errorMsg = responseData.message;
    }
    if (responseData.error) {
      errorMsg = responseData.error;
    }
  }
  return errorMsg;
}

export const formatCategories = (categories: ICategory[], parentId?: string, name?: string) => {
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

export const mediaUploader = async (files: File[], folderName: string) => {
  const uploadedMediaUrls: string[] = [];
  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'stugahyi');
    formData.append('cloud_name', 'ashumantoo');
    formData.append('folder', `flipkart-clone/${folderName}`);

    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/ashumantoo/auto/upload`, formData);
      uploadedMediaUrls.push(res.data.secure_url)
    } catch (error) {
      console.log("Error while uploading media to cloudinary", error);
    }
  }
  return uploadedMediaUrls;
}