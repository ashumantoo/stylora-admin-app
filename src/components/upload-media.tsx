import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadFile, UploadProps, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import { FC, useState } from 'react'
import { mediaUploader } from '../utils/helper';

interface IProgs {
  folderName: string;
  getUploadedMediaUrls: (urls: string[]) => void;
}

export const UploadMedia: FC<IProgs> = ({ folderName, getUploadedMediaUrls }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    try {
      setUploading(true);
      const response = await mediaUploader(fileList as RcFile[], folderName);
      if (response) {
        message.success('upload successfully.');
        // setFileList([]);
        setUploading(false);
        getUploadedMediaUrls(response);
      }
    } catch (error) {
      console.error(error);
      message.error('upload failed.');
      setUploading(false);
    }
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload
        {...props}
      >
        <Button icon={<UploadOutlined />}>Select Image</Button>
      </Upload>
      <Button
        type='primary'
        onClick={handleUpload}
        disabled={!fileList.length}
        loading={uploading}
        className={`mt-4`}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  )
}