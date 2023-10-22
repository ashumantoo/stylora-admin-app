import { AxiosError } from "axios"

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