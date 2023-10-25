import axios, { AxiosError } from "axios"

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